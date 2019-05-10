// @flow
import * as React from 'react'
import * as Kb from '../common-adapters'
import * as FsTypes from '../constants/types/fs'

type Props = {
  onRetry: () => void,
  diskSpaceStatus: FsTypes.DiskSpaceStatus,
}
type State = {
  hidden: boolean,
}

class SpaceWarning extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {hidden: false}
  }

  _close = () => {
    this.setState(() => ({
      hidden: true,
    }))
  }

  componentDidUpdate(prevProps: Props) {
    // got updated
    if (this.props.diskSpaceStatus !== prevProps.diskSpaceStatus) {
      this.setState(() => ({
        hidden: false,
      }))
    }
  }

  render() {
    const display =
      this.props.diskSpaceStatus === 'error' ||
      (this.props.diskSpaceStatus === 'warning' && !this.state.hidden)
    return (
      display && (
        <Kb.Banner
          {...(this.props.diskSpaceStatus === 'warning' ? {onClose: this._close} : {})}
          text={
            this.props.diskSpaceStatus === 'warning'
              ? 'Your computer has less than 1 GB of storage space. Make some' +
                ' space, or unsync some folders.'
              : 'Your computer is out of space. Unsync some folders, or make some space and'
          }
          color={this.props.diskSpaceStatus === 'warning' ? 'blue' : 'red'}
          actions={[
            ...(this.props.onRetry ? [{onClick: this.props.onRetry, title: 'retry' + ' the sync.'}] : []),
          ]}
          narrow={true}
          style={{minHeight: 50}}
        />
      )
    )
  }
}

export default SpaceWarning
