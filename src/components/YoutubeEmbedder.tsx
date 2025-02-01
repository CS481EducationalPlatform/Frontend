
export const YoutubeEmbedder = (
    props:{
        url:string, 
        width?:number, 
        height?:number, 
        autoplay?:boolean, 
        showControls?:boolean, 
        allowKeyboardControl?:boolean, 
        canFullscreen?:boolean, 
        showBorder?:boolean
    }
) => {

    //Establish Defaults for optional parameters
    let embed_width:number = 600;
    let embed_height:number = 400;
    let embed_autoplay:boolean = false;
    let embed_showControls:boolean = true;
    let embed_allowKeyboardControl:boolean = false;
    let embed_canFullscreen:boolean = false;
    let embed_borderToggle:boolean = false;

    //Set YouTube URL
    let youtubeURL:string = props.url;

    //Override defaults if given
    if(props.width !== undefined){ embed_width = props.width; }
    if(props.height !== undefined){ embed_height = props.height; }
    if(props.autoplay !== undefined){ embed_autoplay = props.autoplay; }
    if(props.showControls !== undefined){ embed_showControls = props.showControls; }
    if(props.allowKeyboardControl !== undefined){ embed_allowKeyboardControl = props.allowKeyboardControl; }
    if(props.canFullscreen !== undefined){ embed_canFullscreen = props.canFullscreen; }
    if(props.showBorder !== undefined){ embed_borderToggle = props.showBorder; }

    //Establish function to turn a given youtube URL into an Embed code for simplicity following basic structure
    function URLtoEmbed(url: string):string{
        let embedCode: string = url.split('?v=')[1].split('&')[0];
        let embedLink:string = "https://www.youtube.com/embed/" + embedCode + "?autoplay=" + (embed_autoplay ? 1 : 0) + "&controls=" + (embed_showControls ? 1 : 0) + "&disablekb=" + (embed_allowKeyboardControl ? 0 : 1) + "&fs=" + (embed_canFullscreen ? 1 : 0) + "&rel=0";
        return embedLink;
    }

    //Return the component iframe with organized information, options are within src made by the URLtoEmbed function
    return (<>
        <iframe 
            id="EmbeddedYouTubePlayer" 
            type="text/html" 
            width={embed_width} 
            height={embed_height}
            src={URLtoEmbed(youtubeURL)}
            frameborder={(embed_borderToggle ? 1 : 0)}> 
        </iframe>
    </>)
}

//Another way to do the same with react-youtube package and importing YouTube
/*
<YouTube 
            videoId={URLtoCode(youtubeURL)}
            options={{
                height: `${embed_height}`,
                width: `${embed_width}`
            }} 
            id="YoutubeEmbeddedVideo"
        />
*/