/**
 * Forked from: https://codesandbox.io/s/black-wind-byilt
 */

import Brahmos, { SuspenseList, Suspense, useEffect } from '../../src';

import { fetchProfileData } from './fakeApi';

function App() {
  const initialResource = fetchProfileData(0);
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProfilePage resource={initialResource} />
      </Suspense>
      <p className="attribute">
        This demo is forked from Suspense List demo of React:
        <br />
        <strong>Source: </strong>
        <a href="https://codesandbox.io/s/black-wind-byilt" target="_blank">
          https://codesandbox.io/s/black-wind-byilt
        </a>
      </p>
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <SuspenseList revealOrder="forwards">
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2>Fun Facts</h2>
      <ul>
        {trivia.map((fact) => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
