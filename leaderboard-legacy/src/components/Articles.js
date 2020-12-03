import React from 'react';

class Articles extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (<div className="card w-50 mx-auto">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Upvotes</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log("inside Articles")} */}
                    {/* {console.log(JSON.stringify(articles))} */}

                    {this.props.articles && this.props.articles.map((article, index) =>
                        <tr data-testid="article" key={index}>
                            <td data-testid="article-title">{article.title}</td>
                            <td data-testid="article-upvotes">{article.upvotes}</td>
                            <td data-testid="article-date">{article.date}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>)
    }
}

export default Articles;
