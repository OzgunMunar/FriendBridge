export const formatPostText = (postBody) => {

    return postBody.split('\n').map((line, index) => (

        <div key={index}>
            {index !== 0 ? <br />:''} {line}
        </div>

    ));

};