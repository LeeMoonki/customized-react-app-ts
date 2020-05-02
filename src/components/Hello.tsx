import React from 'react';

export interface HelloProps { name: string; }

function Hello(props: HelloProps) {
  return (
    <div>
      <h1>Hello World and {props.name} !!</h1>
    </div>
  );
}

export default Hello;
