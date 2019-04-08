import React from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Vortex from '../../config/vortex.json'
import Skills from '../../config/skills.json';
import Attributes from '../../config/attributes.json';
import Traits from '../../config/traits.json';
import Incrementer from "../../components/Incrementer/Incrementer";
import Checkbox from "../../components/Checkbox";
import Checks from "../../components/Checks";
import Modal from "../../components/Modal";
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
            Vortex,
            Attributes,
            Skills,
            Traits
        }
    }

    defaultImage = './images/imagebot.png';
    choseImage = false;

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
        console.log(i);

        let attributes = this.state.Attributes;
        let skills = this.state.Skills;

        if (cat === 'Attributes') {
            switch (op) {
                case '+':
                    console.log(attributes.attributes[i].value);
                    attributes.attributes[i].value = attributes.attributes[i].value + 1;
                    this.setState({ charPoints: this.state.charPoints - 1 });
                    console.log(attributes.attributes[i].name);
                    console.log(attributes.attributes[i].value);
                    break;
                case '-':
                    console.log(attributes.attributes[i].value);
                    attributes.attributes[i].value = attributes.attributes[i].value - 1;
                    this.setState({ charPoints: this.state.charPoints + 1 });
                    console.log(attributes.attributes[i].value);
                    break;
                default:
                    break;
            }
        }
        if (cat === 'Skills') {
            switch (op) {
                case '+':
                    console.log(skills.skills[i].value);
                    skills.skills[i].value = skills.skills[i].value + 1;
                    this.setState({ skillPoints: this.state.skillPoints - 1 });
                    console.log(skills.skills[i].value);
                    break;
                case '-':
                    console.log(skills.skills[i].value);
                    skills.skills[i].value = skills.skills[i].value - 1;
                    this.setState({ skillPoints: this.state.skillPoints + 1 });
                    console.log(skills.skills[i].value);
                    break;
                default:
                    break;
            }
        }
        this.setState({ Attributes: attributes });
        this.setState({ Skills: skills });
    }

    handleCharCreation = (event) => {
        event.preventDefault();

        axios.post('/api/chars', {
            name: this.state.charName,
            attributes: this.state.Attributes,
            skills: this.state.Skills,
            traits: this.state.Traits,
            stuff: this.state.stuff,
            goal: this.state.goal,
            personality: this.state.personality,
            background: this.state.background,
            user: localStorage.getItem('userName'),
            gameSystem: this.state.gameSystem,
            gMaster: "liannaarica09",
            image: this.choseImage ? this.image : this.defaultImage
        }).then(res => {
            console.log(this);
            console.log(JSON.parse(res.data));
            this.props.history.push("/play");
        })
    }

    handleCheck = event => {

        console.log(event.target);

        let vortex = this.state.Vortex;
        let traits = this.state.Traits;
        const name = event.target.name;
        const value = event.target.checked;
        const parentIndex = event.target.getAttribute('parent-index');

        this.setState({
            [name]: value
        });

        console.log(parentIndex);
        console.log(traits.traits[parentIndex].name);
        console.log(traits.traits[parentIndex].has);
        traits.traits[parentIndex].has = value;
        console.log(traits.traits[parentIndex].has);
        this.setState({
            Vortex: vortex
        }, function () {
            console.log(this.state.Traits.traits[parentIndex].name);
        });

        if (value === true) {
            console.log("checked");
            console.log(this.state.Traits.traits[parentIndex].cost);
            this.setState({
                charPoints: this.state.charPoints - this.state.Traits.traits[parentIndex].cost
            })
        } else {
            this.setState({
                charPoints: this.state.charPoints + this.state.Traits.traits[parentIndex].cost
            })
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

    previewFile = () => {
        console.log("preview started");
        this.choseImage = true;
        var preview = document.querySelector('#preview');
        console.log(document.getElementById('avatar').files);
        var file = document.getElementById('avatar').files[0];
        var reader = new FileReader();
        console.log(file);

        reader.addEventListener("load", () => {
            console.log("reader load event")
            preview.src = reader.result;
            this.image = reader.result
            console.log(this.image);

        }, false);

        if (file) {
            reader.readAsDataURL(file);
            console.log(this.image);
        }
    }

    handleLogout = () => {
        localStorage.removeItem("currentSystem");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        this.props.history.push("/");
    }

    handleHome = () => {
        this.props.history.push("/");
    };

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
                <header>
                    <div className="dropItem" onClick={this.handleHome}>Home</div>
                    <div className="dropItem" onClick={this.handleLogout}>Logout</div>
                </header>
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
                                {this.state.Attributes.attributes.map((attr, index) => (
                                    <div key={attr.name + index} className="relative">
                                        <Incrementer
                                            key={index}
                                            index={index}
                                            cat={'Attributes'}
                                            name={attr.name}
                                            handleClick={this.handleIncrement}
                                            value={attr.value}
                                            description={attr.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Skills</h3>
                                {this.state.Skills.skills.map((skill, index) => (
                                    <div key={skill.name + index} className="relative">
                                        <Incrementer

                                            index={index}
                                            cat={'Skills'}
                                            name={skill.name}
                                            handleClick={this.handleIncrement}
                                            value={skill.value}
                                            description={skill.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Traits</h3>

                                <div>
                                    {this.state.Traits.traits.map((trait, index) => {
                                        return (
                                            <Checkbox
                                                key={trait.name + index}
                                                name={trait.name}
                                                cost={trait.cost}
                                                handleCheck={this.handleCheck}>

                                                <label className="hoverTrig">{trait.name}</label>

                                                <Modal>
                                                    <p>{trait.description}</p>
                                                    <p>{trait.effect}</p>
                                                </Modal>

                                                <Checks
                                                    needs={trait.needs}
                                                    cat={'Traits'}
                                                    parent={trait.name}
                                                    parentIndex={index}
                                                    cost={trait.cost}
                                                    handleChange={this.handleCheck} />
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
                                <p>Portrait:</p>
                                <img id="preview" alt="placeholder" src="http://via.placeholder.com/150x150" />
                                <input type="file" onChange={this.previewFile}
                                    id="avatar" name="avatar"
                                    accept="image/png, image/jpeg" />
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