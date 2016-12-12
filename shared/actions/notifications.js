// @flow
import * as Constants from '../constants/notifications'
import ListenerCreator from '../native/notification-listeners'
import engine, {Engine} from '../engine'
import {NotifyPopup} from '../native/notifications'
import {call, put, take} from 'redux-saga/effects'
import {log} from '../native/log/logui'
import {notifyCtlSetNotificationsRpc} from '../constants/types/flow-types'
import {registerIdentifyUi, setupUserChangedHandler} from './tracker'
import {setupKBFSChangedHandler} from './favorite'
import {setupNewChatHandler} from './chat'

import type {LogAction, NotificationKeys, ListenForNotifications, ListenForKBFSNotifications, BadgeAppAction} from '../constants/notifications'
import type {SagaGenerator} from '../constants/types/saga'
import type {Text as KBText, LogLevel} from '../constants/types/flow-types'

function logUiLog ({text, level}: {text: KBText, level: LogLevel}, response: any): LogAction {
  log({text, level}, response)
  return {type: Constants.log, payload: {text: text.data, level}}
}

function listenForNotifications (): ListenForNotifications {
  return {type: Constants.listenForNotifications, payload: undefined}
}

function listenForKBFSNotifications (): ListenForKBFSNotifications {
  return {type: Constants.listenForKBFSNotifications, payload: undefined}
}

function * _listenSaga (): SagaGenerator<any, any> {
  const channels = {
    app: true,
    badges: true,
    chat: true,
    favorites: false,
    kbfs: true,
    kbfsrequest: true,
    keyfamily: false,
    paperkeys: false,
    pgp: true,
    service: true,
    session: true,
    tracking: true,
    users: true,
  }

  const engineInst: Engine = yield call(engine)
  yield call([engineInst, engineInst.listenOnConnect], 'setNotifications', () => {
    notifyCtlSetNotificationsRpc({
      param: {channels},
      callback: (error, response) => {
        if (error != null) {
          console.warn('error in toggling notifications: ', error)
        }
      },
    })
  })

  yield put((dispatch, getState) => {
    const listeners = ListenerCreator(dispatch, getState, NotifyPopup)
    Object.keys(listeners).forEach(key => {
      engine().setIncomingHandler(key, listeners[key])
    })
  })

  yield put(registerIdentifyUi())
  yield put(setupUserChangedHandler())
}

function * _listenKBFSSaga (): SagaGenerator<any, any> {
  yield put(setupKBFSChangedHandler())
  yield put(setupNewChatHandler())
}

function badgeApp (key: NotificationKeys, on: boolean, count: number = 0): BadgeAppAction {
  return {
    type: Constants.badgeApp,
    payload: {key, on, count},
  }
}

function * notificationsSaga (): SagaGenerator<any, any> {
  yield [
    take(Constants.listenForNotifications, _listenSaga),
    take(Constants.listenForKBFSNotifications, _listenKBFSSaga),
  ]
}

export {
  badgeApp,
  listenForNotifications,
  listenForKBFSNotifications,
  logUiLog,
}

export default notificationsSaga
