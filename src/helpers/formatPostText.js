export const formatPostText = (postBody) => {

    return postBody.split('\n').map((line, index) => (

        <div key={index}>
            {/* {index !== 0 ? <br />:""} {line} */}
            {index !== 0 ? <div style={{ marginBottom: "15px" }}></div>:""} {line}
        </div>

    ));

};