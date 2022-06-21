import React from "react";

import FallbackLoading from "./FallbackLoading";
import { Suspense } from "react";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<FallbackLoading />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
