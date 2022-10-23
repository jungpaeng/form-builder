import React from 'react';

export function renderer() {
  return {
    Renderer() {
      return (
        <div>
          <p>Renderer Component</p>
        </div>
      );
    },
  };
}
