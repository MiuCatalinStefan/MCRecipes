import React, {Component} from 'react';
import YouTube from "../Photos/YouTube.png";
import Facebook from "../Photos/Facebook.png";
import Twitter from "../Photos/Twitter.png";



export class Footer extends Component{
    render(){
        return(
            <div className="footer">
            <div className="Links">
                <div>
                    <a href="www.facebook.com">
                    <img src={Facebook} alt="Facebook" height="30px" width="30px"></img>
                    </a>
                </div>
                <div>
                    <a href="www.twitter.com">
                    <img src={Twitter} alt="Twitter" height="30px" width="30px"></img>
                    </a>
                </div>
                <div>
                    <a href="www.YouTube.com">
                    <img src={YouTube} alt="YouTube" height="30px" width="30px"></img>
                    </a>
                </div>
            </div>
            <p>Copyright © Miu Catalin 2021</p>
            </div>
        )
    }
}

