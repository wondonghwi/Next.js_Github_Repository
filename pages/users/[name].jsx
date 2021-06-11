import fetch from 'isomorphic-unfetch';
import css from 'styled-jsx/css';
import Profile from '../../components/Profile';
import Repositories from '../../components/Repositories';

const style = css`
  .user-contents-wrapper {
    padding: 20px;
    display: flex;
  }
`;

const name = ({ user, repos }) => {
  return (
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name, page = '1' } = query;
  try {
    let user;
    let repos;

    const userRes = await fetch(`https://api.github.com/users/${name}`, {
      headers: {
        Authorization: 'token 714e48da28db7533dd9dafe6f4f040b142d30560',
      },
    });
    if (userRes.status === 200) {
      user = await userRes.json();
    } else {
      throw Error(userRes.statusText);
    }
    const repoRes = await fetch(`https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`, {
      headers: {
        Authorization: 'token 714e48da28db7533dd9dafe6f4f040b142d30560',
      },
    });
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    } else {
      throw Error(userRes.statusText);
    }
    return { props: { user, repos } };
  } catch (e) {
    console.log(e.message);
    return { props: {} };
  }
};

export default name;
