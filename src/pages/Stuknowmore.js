import Footer from '../components/footer'
import { Form, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'

export default function Stuknowmore() {
    const navigate = useNavigate();
    const { header } = useParams()
    const { user } = useAuthContext()

    console.log(header)
    const [cats, setCats] = useState([
        {
            overview: "",
            image: "",
            description: "",
            start: "",
            end: "",
            img: "",
            p1: "",
            p2: "",
            p3: "",
            sub: "",
            text: "",
            title: "",
        }
    ]);

    const [catsup, setCatsup] = useState({

        title: header,
        name: user.name,
        my_idea: "",
        status: 'pending',
        overview: "",
        img:"",
        image:"",

    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCatsup((prev) => {
    //         return {
    //             ...prev,
    //             [name]: value,
    //         };
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCatsup((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
        // if (name === "overview") {
        //     setCats((prev) => {
        //         return [
        //             {
        //                 ...prev[0],
        //                 overview: value,
        //             },
        //         ];
        //     });
        // }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setCatsup((prev) => {
                return {
                    ...prev,
                    image: reader.result,
                    img: reader.result,
                };
            });
        };
    };


    const createPost = (e) => {
        console.log(catsup)
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API_HOST}/stu_km`, catsup)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        navigate("/stu_ideas");
    };

    useEffect(() => {
        // fetch(`http://localhost:4000/posts/${header}`)
        fetch(`${process.env.REACT_APP_API_HOST}/posts/${header}`)
            .then((res) => res.json())
            .then((jsonRes) => setCats(jsonRes));
    }, []);

    useEffect(() => {
        console.log(cats);
    }, [cats]);

    console.log(catsup)
    const post = cats.filter(post => post.header === header)
    console.log(post)

    const renderCard = (card, index) => {
        return (
            <div className="container-fluid main">
                <div className="col">
                    <div className="row-sm-4 ">
                        <h1 className="text-center p-2 mb-4" style={{ color: '#0056D2' }}><em>{card.header}</em></h1>
                        <div className="shadow p-3 mb-5 bg-red rounded box">
                            <div className="text-center">
                            </div>
                            <h3 className='text-center p-2' style={{ color: "#0056F1" }}><em>Problem Statement</em> </h3>
                            <p className='prob_text'>
                                {card.description}
                            </p>
                            <div className="text-right">
                                <i className="bi bi-calendar-plus prob_text" >
                                    {card.start}
                                </i>
                                <p />
                                <i className="bi bi-calendar-minus prob_text">
                                    {card.end}
                                </i>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row-sm-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Enter your idea</label>
                                <button type="button" className="btn btn-outline btn-light">
                                    <i className="bi bi-link-45deg" style={{ fontSize: '10px', color: 'green' }} />
                                </button>
                                <textarea value={catsup.my_idea} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows={10} defaultValue={""} />
                            </div>
                        </form>
                    </div>
                    <div className="display-5 text-center">
                        <button type="button" className="btn btn-success"  onClick={createPost}>
                            SUBMIT IDEA
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg>
                        </button>
                    </div> */}
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                className='overview_text'
                                name="my_idea"
                                size="lg"
                                as='textarea'
                                rows={8}
                                value={catsup.my_idea}
                                onChange={handleChange}
                                style={{ marginBottom: "2rem" }}
                                placeholder="Enter your idea here..."
                            />
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />
                            <img src={post.img} alt="Preview" className="preview-image" />
                        </Form.Group>
                        <div className='text-center'>
                            <button
                                className='my-button bb blue'
                                onClick={createPost}
                                variant="outline-success"
                                style={{ borderRadius: '2rem' }}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </Form>
                    <div><p /></div>
                </div>
            </div >
        );
    };

    return (
        <>
            <div className="container-fluid main" id="productTable">
                {post.map(renderCard)}
            </div>
        </>
    );
}
