import React from "react";

const ExamplePage = () => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to the Example Page</h1>
            <p>This is a simple page created for testing purposes.</p>
            <button onClick={() => alert("Button Clicked!")}>Test Button</button>
        </div>
    );
};

export default ExamplePage;
