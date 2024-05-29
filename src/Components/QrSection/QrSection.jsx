import { useEffect, useRef, useState } from 'react';
import './QrSection.css'
import {QRCodeSVG} from 'qrcode.react';
import QRCode from 'react-qr-code';
import ScalerLogo from '../../assets/ScalerLogo.png'

export default function QrSection() {

    const [token, setToken] = useState("");
    const QRRef = useRef(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const t = `${Date.now()}`
            setToken(t);
            return () => {
                clearInterval(interval);
            }
        }, 3000);
    }, [])

    return (
        <section className='info'>
            <div className="qrBlock">
                <div className="left">
                    <h1 className="className">
                        <p className="title l1">Scaler</p>
                        <p className="title l2">School of</p>
                        <p className="title l3">Technology</p>
                    </h1>
                </div>
                <div className="right">        
                    <QRCodeSVG
                        value={token}
                        className='QR'
                        bgColor='transparent'
                        fgColor='skyblue'
                        renderAs="canvas"
                        // includeMargin={true}
                        style={{
                            borderRadius:"10px",
                        }}
                        ref={QRRef}
                    />
                </div>
            </div>
        </section>
    );
}