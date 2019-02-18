import React from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Vortex from '../../config/vortex.json'
import Incrementer from "../../components/Incrementer/Incrementer";
import Checkbox from "../../components/Checkbox";
import Checks from "../../components/Checks";
import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome";
import { faPlusCircle } from "../../../../node_modules/@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";


class CreateChar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charName: "",
            gameSystem: "Vortex",
            stuff: [],
            goal: "",
            personality: "",
            background: "",
            tempStuff: "",
            Vortex
        }
    }

    componentDidMount() {
        console.log(localStorage.getItem('currentSystem'));

        if (localStorage.getItem('currentSystem')) {
            this.setState({
                currentSystem: localStorage.getItem('currentSystem'),
            }, function () {
                console.log(this.state);
                if (this.state.currentSystem === 'Vortex') {
                    this.setState({
                        charPoints: 18,
                        skillPoints: 18,
                        storyPoints: 12
                    }, function () {
                        console.log(this.state)
                    });
                }
            });

        }
    }

    onChange(e, field) {
        this.setState({ [field]: e.target.value })
    }

    handleIncrement = (i, cat, op) => {
        console.log(cat);

        let vortex = this.state.Vortex;

        if (cat === 'Attributes') {
            switch (op) {
                case '+':
                    console.log(vortex.Attributes[i].value);
                    vortex.Attributes[i].value = vortex.Attributes[i].value + 1;
                    this.setState({ charPoints: this.state.charPoints - 1 });
                    console.log(vortex.Attributes[i].value);
                    break;
                case '-':
                    console.log(vortex.Attributes[i].value);
                    vortex.Attributes[i].value = vortex.Attributes[i].value - 1;
                    this.setState({ charPoints: this.state.charPoints + 1 });
                    console.log(vortex.Attributes[i].value);
                    break;
                default:
                    break;
            }
        }
        if (cat === 'Skills') {
            switch (op) {
                case '+':
                    console.log(vortex.Skills[i].value);
                    vortex.Skills[i].value = vortex.Skills[i].value + 1;
                    this.setState({ skillPoints: this.state.skillPoints - 1 });
                    console.log(vortex.Skills[i].value);
                    break;
                case '-':
                    console.log(vortex.Skills[i].value);
                    vortex.Skills[i].value = vortex.Skills[i].value - 1;
                    this.setState({ skillPoints: this.state.skillPoints + 1 });
                    console.log(vortex.Skills[i].value);
                    break;
                default:
                    break;
            }
        }

        this.setState({ Vortex: vortex });
    }

    handleCharCreation = (event) => {
        event.preventDefault();

        axios.post('/api/chars', {
            name: this.state.charName,
            attributes: this.state.Vortex.Attributes,
            skills: this.state.Vortex.Skills,
            traits: this.state.Vortex.Traits,
            stuff: this.state.stuff,
            goal: this.state.goal,
            personality: this.state.personality,
            background: this.state.background,
            user: localStorage.getItem('userName'),
            gameSystem: this.state.gameSystem,
            gMaster: "liannaarica09"
            // image: this.choseImage ? this.image : this.defaultImage
        }).then(res => {
            console.log(JSON.parse(res.config.data));
            this.props.history.push("/play");
        })
    }

    handleCheck = event => {

        console.log(event.target);

        let vortex = this.state.Vortex;
        const name = event.target.name;
        const value = event.target.checked;
        const parentIndex = event.target.getAttribute('parent-index');

        this.setState({
            [name]: value
        });

        console.log(parentIndex);
        console.log(vortex.Traits[parentIndex].name);
        console.log(vortex.Traits[parentIndex].charHas);
        vortex.Traits[parentIndex].charHas = value;
        console.log(vortex.Traits[parentIndex].charHas);
        this.setState({
            Vortex: vortex
        }, function () {
            console.log(this.state.Vortex.Traits[parentIndex].name);
            console.log(this.state.Vortex.Traits[parentIndex].charHas);
        });

        if (name === "Alien" || name === "Psychic" || name === "Time Lord") {
            console.log(name);
            alert("this trait is not available yet.");
        }

        if (name === "Minor Good") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints - 1
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints + 1
                })
            }
        } else if (name === "Minor Bad") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints + 1
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints - 1
                })
            }
        } else if (name === "Major Good") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints - 2
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints + 2
                })
            }
        } else if (name === "Major Bad") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints + 2
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints - 2
                })
            }
        } else if (name === "Special Good" || name === "Special Bad") {

            if (this.state.Vortex.Traits[parentIndex].cost) {
                const cost = this.state.Vortex.Traits[parentIndex].cost;
                console.log(Object.keys(cost));

                Object.keys(cost).forEach(pointType => {
                    console.log(parseFloat(cost[pointType]));
                    console.log(this.state[pointType]);

                    this.setState({
                        [pointType]: this.state[pointType] + cost[pointType]
                    });
                });
            } else {
                console.log("No cost available");
                alert("this trait is not available yet.");
            }
        }
    }

    addStuff = () => {
        let tempArray = this.state.stuff;
        console.log(tempArray);
        tempArray.push(this.state.tempStuff);
        console.log(tempArray);
        this.setState({
            stuff: tempArray
        })
    }

    render() {
        if (!localStorage.getItem('currentSystem')) {
            return <Redirect to={'/play'} />
        }
        if (!localStorage.getItem('userName')) {
            return <Redirect to={'/'} />
        }
        const enabled = this.state.charName && this.state.charPoints < 15;
        var settings = {
            dots: true,
            arrows: true,
            accessibility: true,
            infinite: true,
            swipe: true,
            swipeToSlide: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    },
                    // eslint-disable-next-line
                    breakpoint: 850,
                    // eslint-disable-next-line
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]

        };

        return (
            <div className="pagePadding">
                <div className="thirds">
                    <div><p>Character Points</p>  {this.state.charPoints}</div>
                    <div><p>Skill Points</p> {this.state.skillPoints}</div>
                    <div><p>Story Points</p>  {this.state.storyPoints}</div>
                </div>
                <form onSubmit={this.handleCharCreation}>
                    <div className="createHeader">
                        <p>Name</p>
                        <input type="text" value={this.state.charName} onChange={(e) => this.onChange(e, 'charName')} />
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slide">
                                <h3>Attributes</h3>
                                {this.state.Vortex.Attributes.map((attr, index) => (
                                    <Incrementer
                                        key={index}
                                        index={index}
                                        cat={'Attributes'}
                                        name={attr.name}
                                        handleClick={this.handleIncrement}
                                        value={attr.value}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Skills</h3>
                                {this.state.Vortex.Skills.map((skill, index) => (
                                    <Incrementer
                                        key={index}
                                        index={index}
                                        cat={'Skills'}
                                        name={skill.name}
                                        handleClick={this.handleIncrement}
                                        value={skill.value}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Traits</h3>

                                <div>
                                    {this.state.Vortex.Traits.map((trait, index) => {
                                        return (
                                            <Checkbox
                                                key={trait.name + index}
                                                name={trait.name}
                                                needs={trait.needs}
                                                disabled={trait.disabled}
                                                cost={trait.cost}
                                                handleCheck={this.handleCheck}>

                                                <label className="whiteText">{trait.name}</label>
                                                {trait.type.map((type, i) => {
                                                    return (
                                                        <div key={type + i.toString() + trait.name}>
                                                            <label>{type}</label>
                                                            <Checks
                                                                index={i}
                                                                needs={trait.needs}
                                                                cat={'Traits'}
                                                                parent={trait.name}
                                                                parentIndex={index}
                                                                name={type}
                                                                cost={trait.cost}
                                                                handleChange={this.handleCheck} />
                                                        </div>)
                                                })}
                                            </Checkbox>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Stuff</h3>
                                <input type="text" value={this.state.tempStuff} onChange={(e) => this.onChange(e, 'tempStuff')} />
                                <FontAwesomeIcon icon={faPlusCircle} onClick={this.addStuff} />
                                {this.state.stuff.map((thing, index) => {
                                    return (
                                        <div
                                            key={thing + index.toString()}
                                        >{thing}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Biodata</h3>
                                <p>Personal Goal</p>
                                <textarea name="goal" id="goal" cols="30" rows="10" onChange={(e) => this.onChange(e, 'goal')}></textarea>
                                <p>Personality</p>
                                <textarea name="personality" id="personality" cols="30" rows="10" onChange={(e) => this.onChange(e, 'personality')}></textarea>
                                <p>Background</p>
                                <textarea name="background" id="background" cols="30" rows="10" onChange={(e) => this.onChange(e, 'background')}></textarea>
                            </div>
                        </div>
                    </Slider>
                    <div className="createSubmit">
                        <button
                            disabled={!enabled}>
                            Submit
                            </button>
                    </div>
                </form>
            </div>
        )
    }
};

export default CreateChar;