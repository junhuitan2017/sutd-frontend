import styled from 'styled-components';

const CardWrapper = styled.div`
    height: 300px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 0 20px;
    background: ${({bgcolor}) => bgcolor};
`

const VName = styled.h1`
    font-size: 20px;
`

const VImage = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid black;
`

const VIcons = styled.div`
    display: flex;
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
`

function Card(props) {
    const {info} = props;
    return (
        <CardWrapper bgcolor={info.color}>
            <VName>{info.name}&nbsp;
            <img
                src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-pencil-14.png'
                alt="Edit Icon"
                height="20"
                width="20"
            />
            </VName>
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