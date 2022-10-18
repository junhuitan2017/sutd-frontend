import { useState } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    height: 300px;
    border: 1px solid black;
    border-radius: 8px;
    ${({edit}) => edit ? "" : "padding: 0 20px;"}
    background: ${({bgcolor}) => bgcolor};
    flex-flow: ${({edit}) => edit ? "row" : "column"};
    align-items: center;
`
const OptionWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    height: 100%;
    padding: 0 10px;
`
const OptionDiv = styled.div`
    display: grid;
    grid-template-columns: 40% 55%;
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

const VIcon = styled.a`
    height: 45px;
    width: 45px;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid black;
    background-image: url(${({src}) => src});
    background-position: 50% 50%;
    background-repeat:no-repeat;
    background-size: contain;
    background-origin: content-box;
    background-color: white;
`

function Card(props) {
    const {info, onChange} = props;

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
        onChange(editInfo)
        setEditMode(false)
    }

    const updateInfo = (title, value) => {
        const option = title.split(" ")[0].toLowerCase()
        setEditInfo({...info, [option]: value})
        setOptions({...options, [title]: value})
    }

    return editMode ? (
        <CardWrapper bgcolor={info.color} edit={editMode}>
            <img width="100px" src={info.image}/>
            <OptionWrapper>
                {
                    Object.keys(options).map(title => (
                        <OptionDiv key={`${title}${info.id}`}>
                            <span>{title}:</span>
                            <input type="text" value={options[title]} onChange={(e) => {updateInfo(title, e.target.value)}}/>
                        </OptionDiv>
                    ))
                }
                <button onClick={onEdit}>Save</button>
            </OptionWrapper>
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
            />
            </VName>
            <VGen>Gen {info.gen}</VGen>
            <VImage src={info.image} />
            <VIcons>
                <VIcon
                    href={info.youtube}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                />
                <VIcon
                    href={info.twitter}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&usqp=CAU"
                />
            </VIcons>
        </CardWrapper>
    )
}

export default Card;