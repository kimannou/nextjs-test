import styled from 'styled-components';

import Layout from '../components/Layout';

import fetch from 'isomorphic-unfetch';

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    max-width: 450px;
  }

  img {
    padding: 0 5px;
    height: 150px;
  }
`;


const Blog  = props => (
  <Layout>
    <h1 data-testid="page-title">Blog</h1>
    <p data-testid="text">This is blog list for test</p>
    <form className="comment-form" >
        <input type="text"placeholder="Search..." onChange={(e) => {props.onChange}}/>
        <input type="submit" hidden />
    </form>
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
            <h6>{post.title}</h6>
            {post.src ? (
                <ImageWrapper>
                    <div>
                        <img data-testid="img" src={'https://upply-interview.herokuapp.com/images/' + post.src} />
                    </div>
                </ImageWrapper>)
            : ''}  
            <p>{post.text}</p>
        </li>
      ))}
    </ul>
  </Layout>
);

Blog.getInitialProps = async function() {
    const res = await fetch('https://upply-interview.herokuapp.com/');
    const data = await res.json();

    var sorted_meetings = data.sort((a,b) => {
        return new Date(a.date).getTime() - 
            new Date(b.date).getTime()
    }).reverse();

    return {
      posts: data.map(entry => entry)
    };
};

Blog.onChange = function() {
    console.log('search');
  }
export default Blog;
