// @flow
import * as ConfigGen from '../../actions/config-gen'
import {
  createTrace,
  createProcessorProfile,
  createLoadLockdownMode,
  createLoadHasRandomPw,
  createLoadUseNativeFrame,
  createOnChangeLockdownMode,
  createOnChangeUseNativeFrame,
} from '../../actions/settings-gen'
import * as RPCTypes from '../../constants/types/rpc-gen'
import * as RouteTreeGen from '../../actions/route-tree-gen'
import {HeaderHoc} from '../../common-adapters'
import * as Constants from '../../constants/settings'
import {anyErrors, anyWaiting} from '../../constants/waiting'
import {compose} from 'recompose'
import Advanced from './index'
import {connect, lifecycle} from '../../util/container'

type OwnProps = {||}
const mapStateToProps = state => {
  const settingLockdownMode = anyWaiting(state, Constants.setLockdownModeWaitingKey)
  const setLockdownModeError = anyErrors(state, Constants.setLockdownModeWaitingKey)
  return {
    hasRandomPW: !!state.settings.password.randomPW,
    lockdownModeEnabled: state.settings.lockdownModeEnabled,
    openAtLogin: state.config.openAtLogin,
    processorProfileInProgress: Constants.processorProfileInProgress(state),
    setLockdownModeError: setLockdownModeError?.message ?? '',
    settingLockdownMode,
    traceInProgress: Constants.traceInProgress(state),
    useNativeFrame: state.settings.useNativeFrame,
  }
}

const mapDispatchToProps = dispatch => ({
  _loadHasRandomPW: () => dispatch(createLoadHasRandomPw()),
  _loadLockdownMode: () => dispatch(createLoadLockdownMode()),
  _loadUseNativeFrame: () => dispatch(createLoadUseNativeFrame()),
  onBack: () => dispatch(RouteTreeGen.createNavigateUp()),
  onChangeLockdownMode: (checked: boolean) => dispatch(createOnChangeLockdownMode({enabled: checked})),
  onChangeUseNativeFrame: (checked: boolean) => dispatch(createOnChangeUseNativeFrame({enabled: checked})),
  onDBNuke: () => dispatch(RouteTreeGen.createNavigateAppend({path: ['dbNukeConfirm']})),
  onProcessorProfile: (durationSeconds: number) => dispatch(createProcessorProfile({durationSeconds})),
  onSetOpenAtLogin: (open: boolean) => dispatch(ConfigGen.createSetOpenAtLogin({open, writeFile: true})),
  onTrace: (durationSeconds: number) => dispatch(createTrace({durationSeconds})),
})

export default compose(
  connect<OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
    (s, d, o) => ({...o, ...s, ...d})
  ),
  lifecycle({
    componentDidMount() {
      console.log("Mounting")
      this.props._loadLockdownMode()
      this.props._loadHasRandomPW()
      this.props._loadUseNativeFrame()
    },
  }),
  HeaderHoc
)(Advanced)
