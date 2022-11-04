import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const HomeTitle = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    padding: 0 20px;

    h1 {
        margin-right: 15px;
    }
`

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
const SortDiv = styled.div`
    padding: 10px;
    border: 1px solid black;
    // border-radius: 10px;
    margin: 0 10px;
    cursor: pointer;
    ${({ isSelect }) => isSelect ? `
        font-weight: bold;
        background-color: #00FFFF;
    ` : ""}
`

const MainDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 80%;
    justify-content: center;
`

function Home(props) {
    const [vtubers, setVtubers] = useState([]);
    const [displayBy, setDisplayBy] = useState("gen asc")

    const updateDB = (vtuber, method) => {
        // const apiUrl = process.env.NODE_ENV === 'production' ? "http://54.169.255.223:3001" : "http://localhost:3001";
        const apiUrl = "http://54.169.100.199:3001";
        const updatePromise = method === "GET"
            ? fetch(`${apiUrl}/get`)
            : fetch(`${apiUrl}/${method.toLowerCase()}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vtuber)
        })
        updatePromise.then(res => res.json()).then(data => {
            setVtubers([
                ...data,
                {
                    // Add Card
                    id: -1,
                    image: "https://cdn1.iconfinder.com/data/icons/zeir-miscellaneous-elements-1/32/plus_add_new_more_positive-512.png",
                    color: "#D3D3D3"
                }
            ])
        });
    }

    useEffect(() => {
        updateDB({}, "GET");
    }, [])

    const sortVtubers = (a, b) => {
        if (a.id === -1 || b.id === -1) {
            return 0;
        }
        const [display, order] = displayBy.split(" ");

        switch (display) {
            case "gen":
                return order === "asc" ? parseFloat(a.gen) - parseFloat(b.gen) : parseFloat(b.gen) - parseFloat(a.gen);
            case "name":
                return order === "asc" ? (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
            default:
                return 0;
        }
    }

    return (
        <HomeWrapper>
            <HomeTitle><h1>Know Your</h1><img src="/holologo.png" alt="Hololive Logo" height="40px" /></HomeTitle>
            <DisplayDiv>
                <span>Display by: </span>
                <SortDiv
                    onClick={() => { setDisplayBy(displayBy === "gen asc" ? "gen desc" : "gen asc") }}
                    isSelect={displayBy.split(" ")[0] === "gen"}
                >Gen</SortDiv>
                <SortDiv
                    onClick={() => { setDisplayBy(displayBy === "name asc" ? "name desc" : "name asc") }}
                    isSelect={displayBy.split(" ")[0] === "name"}
                >Name</SortDiv>
            </DisplayDiv>
            <MainDiv>
                {vtubers.sort(sortVtubers).map((vtuber, idx) => (
                    <Card
                        key={`Card${vtuber.id}`}
                        info={vtuber}
                        onChange={v => {updateDB(v, v.id === -1 ? "POST" : "PUT")}}
                        onDelete={v => {updateDB(v, "DELETE")}}
                    />
                ))}
            </MainDiv>
        </HomeWrapper>
    )
}

export default Home;
