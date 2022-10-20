import { useState } from 'react';
import styled from 'styled-components';

const OptionWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    height: 90%;
    padding: 0 10px;
    margin-right: 5%;
    border-radius: 10px;
    background: ${({ bgcolor }) => bgcolor};
`
const OptionDiv = styled.div`
    display: grid;
    grid-template-columns: 40% 55%;
`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const OptionButton = styled.button`
    width: 45%;
    padding: 10px 0;
    box-shadow: #422800 4px 4px 0 0;
    font-weight: 600;
    cursor: pointer;
    background-color: ${({ color }) => color};

    :hover {
        background-color: #fff;
    }
`

const VName = styled.h1`
    margin: 0;
    margin-top: 10px;
    font-size: 20px;
`

const VGen = styled.span`
    margin: 5px 0;
`

const VImage = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid black;
    background: white;
`

const VIcons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin: 10px 0;
`

const VIcon = styled(OptionButton)`
    height: 50px;
    width: 50px;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid black;
    background-image: url(${({ src }) => src});
    background-position: 50% 50%;
    background-repeat:no-repeat;
    background-size: contain;
    background-origin: content-box;
    background-color: transparent;
`

const CardWrapper = styled.div`
    display: flex;
    height: 300px;
    border: 1px solid black;
    ${({ edit }) => edit ? "" : "padding: 0 20px;"}
    margin: 10px;
    background: ${({ bgcolor }) => `${bgcolor}C6`};
    flex-flow: ${({ edit }) => edit ? "row" : "column"};
    align-items: center;
    justify-content: center;

    :hover {
        ${({ edit, bgcolor }) => edit ? "" : `background: ${bgcolor};`}
        box-shadow: 5px 5px 10px gray;

        ${({isAdd}) => isAdd ? "" : `
            & ${VImage} {
                background-image: url("https://i.pinimg.com/originals/07/f7/27/07f72772fee4f51adcf8f9aa9fa1a8e0.gif");
            }
        `}
    }
`

function Card(props) {
    const { info, onChange, onDelete } = props;

    const [editMode, setEditMode] = useState(false);
    const [editInfo, setEditInfo] = useState(info);
    const [options, setOptions] = useState({
        "Name": info.name,
        "Image URL": info.image,
        "Gen": info.gen,
        "Color": info.color,
        "Youtube URL": info.youtube,
        "Twitter URL": info.twitter
    });

    const onEdit = () => {
        onChange(editInfo);
        setEditMode(false);

        // Reset options
        setOptions({
            "Name": info.name,
            "Image URL": info.image,
            "Gen": info.gen,
            "Color": info.color,
            "Youtube URL": info.youtube,
            "Twitter URL": info.twitter
        });
    }

    const updateInfo = (title, value) => {
        const option = title.split(" ")[0].toLowerCase()
        setEditInfo({ ...editInfo, [option]: value })
        setOptions({ ...options, [title]: value })
    }

    const createInputField = (title) => {
        let type = "text";
        switch (title) {
            case "Color":
                type = "color";
                break;
            case "Gen":
                type = "number";
                break;
            default:
                break;
        }
        return <input type={type} value={options[title]} onChange={(e) => { updateInfo(title, e.target.value) }} />
    }

    return editMode ? (
        <CardWrapper bgcolor={options.Color} edit={editMode}>
            <img width="100px" src={options["Image URL"]} />
            <OptionWrapper bgcolor={options.Color}>
                {
                    Object.keys(options).map(title => (
                        <OptionDiv key={`${title}${info.id}`}>
                            <span>{title}:</span>
                            {createInputField(title)}
                        </OptionDiv>
                    ))
                }
                <ButtonGroup>
                    <OptionButton onClick={onEdit} color="#00FFFF">Save</OptionButton>
                    <OptionButton onClick={() => { setEditMode(false) }} color="#FFCCCB">Cancel</OptionButton>
                </ButtonGroup>
            </OptionWrapper>
        </CardWrapper>
    ) : info.id === -1 ? (
        <CardWrapper bgcolor={info.color} edit={editMode} isAdd>
            <VImage src={info.image} onClick={() => setEditMode(true)} style={{ cursor: "pointer" }} />
        </CardWrapper>
    ) : (
        <CardWrapper bgcolor={info.color} edit={editMode}>
            <VName>{info.name}&nbsp;
                <img
                    src='https://cdn-icons-png.flaticon.com/512/266/266146.png'
                    alt="Edit Icon"
                    height="20"
                    width="20"
                    onClick={() => setEditMode(true)}
                    style={{ cursor: "pointer" }}
                />&nbsp;
                <img
                    src='https://cdn-icons-png.flaticon.com/512/3481/3481306.png'
                    alt="Delete Icon"
                    height="20"
                    width="20"
                    onClick={() => { onDelete(info) }}
                    style={{ cursor: "pointer" }}
                />
            </VName>
            <VGen>Gen {info.gen}</VGen>
            <VImage src={info.image} />
            <VIcons>
                <a
                    href={info.youtube}
                    target="_blank">
                    <VIcon
                        src="https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png"
                    />
                </a>
                <a
                    href={info.twitter}
                    target="_blank">
                    <VIcon
                        src="https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png"
                    />
                </a>
            </VIcons>
        </CardWrapper>
    )
}

export default Card;