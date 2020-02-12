import React, { useState, useEffect } from 'react';
import axios from 'axios';
const GitCard = () => {
    const [gitCard, setGitCard] = useState();
    useEffect(() => {
        axios.get("https://api.github.com/users/HeWhoCartsRoses")
            .then(response => {
                console.log(response);
                setGitCard(response.data);
            })
            .catch(error => {
                console.log("the data was not returned", error)
            })
    }, []);
    useEffect(() => {


        axios.get('https://api.github.com/users/HeWhoCartsRoses/followers')
            .then(response => {
                console.log(response);
                response.data.map(item => {
                    axios.get(`https://api.github.com/users/${item.login}`)
                        .then(follow => {
                            console.log(follow)
                            setGitCard(follow.data);
                        })
                        .catch(error => {
                            console.log("the data was not returned", error)
                        })
                })
            })
            .catch(error => {
                console.log("the data was not returned", error)
            })
    }, []);
    if (!gitCard) {
        return <div>Loading gitCard information...</div>;
    }
    const { login, name, metascore, stars } = gitCard;
    return (
        <div className="save-wrapper">
            <div className="gitCard-card">
                <h2>{login}</h2>
                <div className="gitCard-director">
                    name: <em>{name}</em>
                </div>
                <div className="gitCard-metascore">
                    Metascore: <strong>{metascore}</strong>
                </div>
                ))}
            </div>
            <div className="save-button">Save</div>
        </div>
    );
}
export default GitCard;