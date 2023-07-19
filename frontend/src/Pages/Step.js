import Timer from "./Timer";
import YoutubeEmbed from "./Video";

const Step = (props) =>{


    let step;

    if(props.timer != 0)
    {
        step = (
            <td className="recipeList">
            <div className="ytdiv" >
            <YoutubeEmbed embedId={props.video} />
            </div>
            <div className="ytdiv">
            <Timer time={props.timer} />
            <p className="pInfo">{props.description}</p>
            </div>
            </td>
        )
    }else{
        step = (
            <td className="recipeList">
            <div >
            <YoutubeEmbed embedId={props.video} />
            </div>
            <p className="pInfo">{props.description}</p>
            </td>
        )
    }

    return(
        <div>
            {step}
        </div>
    )
}

export default Step;