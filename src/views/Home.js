import { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HomeWrapper = styled(FlexCenter)`
    flex-flow: column;

    & > div {
        margin: 20px 0;
    }
`

const DisplayDiv = styled(FlexCenter)`
`

const MainDiv = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-evenly;
`

function Home(props) {
    const [vtubers, setVtubers] = useState([
        {
            name: "Inugami Korone",
            image: "https://static.miraheze.org/hololivewiki/thumb/f/f3/Inugami_Korone_-_Portrait_05.png/290px-Inugami_Korone_-_Portrait_05.png",
            youtube: "#",
            twitter: "#",
            color: "#FFFF00"
        },
        {
            name: "Nekomata Okayu",
            image: "https://static.miraheze.org/hololivewiki/thumb/1/12/Nekomata_Okayu_-_Portrait_3D_01.png/290px-Nekomata_Okayu_-_Portrait_3D_01.png",
            youtube: "#",
            twitter: "#",
            color: "#CBC3E3"
        },
    ]);

    return (
        <HomeWrapper>
            <h1>Know Your <img src="/holologo.png" alt="Hololive Logo" height="40px" /></h1>
            <DisplayDiv>
                Display by: <DisplayDiv>
                    <div>Gen</div>
                    <div>Name</div>
                </DisplayDiv>
            </DisplayDiv>
            <MainDiv>
                {vtubers.map(vtuber => (
                    <Card info={vtuber}/>
                ))}
            </MainDiv>
        </HomeWrapper>
    )
}

export default Home;