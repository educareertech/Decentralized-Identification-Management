import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";

const Loader = (props) => {
  return (
    <>

      <ClipLoader
        color={"#102B7B"}
        loading={props.color}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    </>
  );
};


export default Loader;