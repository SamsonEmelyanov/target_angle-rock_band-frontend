import React from 'react';

export function Error({ message="Error :-(", onRetry }) {
    const wrap = {
        display:"flex", gap:12, padding:14, borderRadius:8, width: 300,
        background:"#000000", color:"#ce0000", alignItems:"flex-start"
    };
    const btn = { background:"#520000", color:"#ffffff", border:0, padding:"6px 10px", borderRadius:6 };
    return (
        <div style={wrap} role="alert" aria-live="assertive">
            <div style={{fontSize:20}}>⚠️</div>
            <div>
                <div style={{fontWeight:600}}>{message}</div>
                {onRetry && <div style={{marginTop:8}}><button style={btn} onClick={onRetry}>Повторить</button></div>}
            </div>
        </div>
    );
}


export default Error;