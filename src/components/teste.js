import React from 'react';
import Card from 'react-bootstrap/Card';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const teste = () =>{
    return(
        
        <div className="card" style={{flexDirection: 'row-reverse'}}>
            <div className="card-body" >
                <img src="../images/logo.png" />
                <h4 className="card-title">
                    Card title
                </h4>
                <p className="card-text">lorem..........</p>
            </div>
            
        </div>
    );
};

export default teste;
