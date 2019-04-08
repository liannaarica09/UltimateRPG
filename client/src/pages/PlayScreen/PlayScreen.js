import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SystemSelector from "../../components/SystemSelector";
import Header from "../../components/header";
import systems from "../../config/systems.json";
import SystemItem from "../../components/SystemItem";
import DropItem from "../../components/DropItem";
import { CharSheet, Attributes, Biodata, CharHeader, Skills, Stuff, Traits } from "../../components/CharSheet";
import "./PlayScreen.css";

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSystem: localStorage.getItem('currentSystem'),
            player: localStorage.getItem('userName'),
            systems,
            chars: [],
            character: '',
            traits: [],
            attributes: [],
            skills: [],
            stuff: [],
            goal: "",
            personality: "",
            background: "",
            url: ""

        }
    }

    componentDidMount() {
        console.log(this.state.player);

        axios.get('/api/users/', {
            params: {
                userName: this.state.player
            }
        }).then(res => {
            console.log(res.data.chars);
            let chars = [];
            for (let i = 0; i < res.data.chars.length; i++) {
                let tName = res.data.chars[i].name;
                let tId = res.data.chars[i]._id;
                let tChar = {
                    "name": tName,
                    "id": tId
                }
                chars.push(tChar);
            };
            console.log(chars);
            this.setState({ chars: chars });
        })
    };

    handleSystemClick = system => {
        console.log(system);
        this.setState({ currentSystem: system }, function () {
            localStorage.setItem('currentSystem', system)
            console.log(this.state);
        });
    };

    handleCharChoice = (id) => {
        axios.get('/api/chars/' + id)
            .then(res => {
                console.log(res.data.attributes[0].attributes);

                let tempTrait = [];
                for (let j = 0; j < res.data.traits[0].traits.length; j++) {
                    console.log("index " + j);
                    console.log(res.data.traits[0].traits[j]);
                    if (res.data.traits[0].traits[j].has) {
                        console.log(res.data.traits[0].traits[j].name);
                        tempTrait.push(res.data.traits[0].traits[j]);
                        // console.log(tempTrait);
                    }
                }

                this.setState({
                    character: res.data.name,
                    traits: tempTrait,
                    skills: res.data.skills,
                    attributes: res.data.attributes,
                    goal: res.data.goal,
                    stuff: res.data.stuff,
                    personality: res.data.personality,
                    background: res.data.background,
                    url: res.data.image
                }, function () {
                    console.log(this.state.attributes);
                });
            });
    };

    handleNew = () => {
        this.props.history.push("/create");
    };

    render() {
        const currentSystem = this.state.currentSystem;

        if (!localStorage.getItem("userName")) {
            return <Redirect to={'/'} />
        }

        return (
            <div>
                {currentSystem ? (
                    <div>
                        <Header
                            sysValue={this.state.currentSystem}
                            charValue={this.state.character}
                            history={this.props.history}
                        >
                            <div className="dropdown">
                                <h1 className="dropbtn">{this.state.character ? (this.state.character) : "Character"}</h1>
                                <div className="dropdown-content">
                                    {this.state.chars.map((char, index) => (
                                        <DropItem
                                            id={char.id}
                                            key={index}
                                            name={char.name}
                                            handleClick={this.handleCharChoice}
                                        />
                                    ))}
                                    <div className="dropItem" onClick={this.handleNew}>New Character</div>
                                </div>
                            </div>
                        </Header>
                        <div className="center">
                            {this.state.character ? (
                                <CharSheet>
                                    <CharHeader
                                        char={this.state.character} />
                                    <Attributes
                                        awareness={this.state.attributes[0].attributes[0].value}
                                        coordination={this.state.attributes[0].attributes[1].value}
                                        ingenuity={this.state.attributes[0].attributes[2].value}
                                        presence={this.state.attributes[0].attributes[3].value}
                                        resolve={this.state.attributes[0].attributes[4].value}
                                        strength={this.state.attributes[0].attributes[5].value} />
                                    <Skills
                                        athletics={this.state.skills[0].skills[0].value}
                                        medicine={this.state.skills[0].skills[1].value}
                                        convince={this.state.skills[0].skills[2].value}
                                        science={this.state.skills[0].skills[3].value}
                                        craft={this.state.skills[0].skills[4].value}
                                        subterfuge={this.state.skills[0].skills[5].value}
                                        fighting={this.state.skills[0].skills[6].value}
                                        survival={this.state.skills[0].skills[7].value}
                                        knowledge={this.state.skills[0].skills[8].value}
                                        technology={this.state.skills[0].skills[9].value}
                                        marksman={this.state.skills[0].skills[10].value}
                                        transport={this.state.skills[0].skills[11].value} />
                                    <Biodata
                                        goal={this.state.goal}
                                        personality={this.state.personality}
                                        background={this.state.background}
                                        url={this.state.url}
                                    />
                                    <Traits className="traits">
                                        {this.state.traits.map((trait, index) => {
                                            return (
                                                <p
                                                    id={trait.name}
                                                    key={trait.name + index}
                                                    name={trait.name}
                                                >{trait.name}</p>
                                            )
                                        })}
                                    </Traits>
                                    <Stuff>
                                        {this.state.stuff.map((thing, index) => {
                                            return (
                                                <p
                                                    id={thing}
                                                    key={thing + index}
                                                    name={thing}>{thing}</p>
                                            )
                                        })}
                                    </Stuff>
                                </CharSheet>
                            ) : (
                                    <div>
                                        <h1>No Characters Found</h1>
                                        <h3>Click 'Character' above and select 'New Character' to make one.</h3>
                                    </div>
                                )}
                        </div>
                    </div>
                ) : (
                        <SystemSelector>
                            {this.state.systems.map(system => (
                                <SystemItem
                                    key={system.id}
                                    value={system.name}
                                    handleClick={this.handleSystemClick}
                                />
                            ))}
                        </SystemSelector>
                    )}
            </div>
        )

    }
}

export default PlayScreen;