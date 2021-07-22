import React from "react";
import { useHistory } from "react-router-dom";

export const Register = () => {
    const history = useHistory();
    const [user, setUser] = React.useState({
        name: "", email: "", phone: "", work: "",
        password: "", cpassword: ""
    });

    let name, value;

    const handleChange = (event) => {
        console.log(event);
        name = event.target.name;
        value = event.target.value;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const URL = "http://localhost:9000/api";
        const res = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 422 || data.err || !data) {
            window.alert(data.error);
        } else {
            window.alert("Success!");
            history.push(`${URL}/login`);
        }
    };

    return (
        <main className="signup">
            <div className="container">
                <h1>Register</h1>
                <aside className="row justify-content-md-center">
                    <div className="col col-lg-3">
                        <form className="center">
                            <div className="form-group">
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Name"
                                        aria-label="Username"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Email"
                                        aria-label="Email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Phone"
                                        aria-label="Phone"
                                        type="phone"
                                        id="phone"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Work"
                                        aria-label="Work"
                                        type="text"
                                        id="work"
                                        name="work"
                                        value={user.work}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Password"
                                        aria-label="Password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <aside className="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        placeholder="Confirm Password"
                                        aria-label="Confirm Password"
                                        type="password"
                                        id="cpassword"
                                        name="cpassword"
                                        value={user.cpassword}
                                        onChange={handleChange}
                                    />
                                </aside>
                                <button
                                    className="btn btn-primary" 
                                    type="submit"
                                    onClick={handleSubmit}
                                    >Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </aside>
            </div>
        </main>
    );
};




