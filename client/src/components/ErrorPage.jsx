import React from "react";
import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
    return (
        <main className="error-page">
            <aside className="mt-5">
                <section className="h1">404</section>
                <section className="h2">ERROR Page not found!</section>
                <section className="mt-5">
                    <NavLink to="/">
                        <button 
                            type="button" 
                            className="btn btn-outline-warning"
                            >Back to Home
                        </button>
                    </NavLink>
                </section>
            </aside>
        </main>
    );
};




