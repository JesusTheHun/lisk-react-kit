import React from "react";
import QRCode from "qrcode.react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons/lib";

type State = {};

type Props = {
  address: string;
};

export class QRCodeModal extends React.Component<Props, State> {

  download = () => {
    const canvas = document.getElementsByTagName('canvas').item(0);

    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpg');
      link.download = "featchain-verification-qrcode";
      link.click();
    }
  };

  render() {

    const qrcodeURL = window.APP_CONFIG.THIS_FRONT_URL + getPath('verifyAccount', this.props.address);

    return <div className="uk-text-center">
      <QRCode value={qrcodeURL} size={256}/>
      <div className="uk-margin-medium-top">
        <Button type='primary' icon={<DownloadOutlined/>} onClick={this.download}>Download</Button>
      </div>
    </div>;
  }
}

export default QRCodeModal;
