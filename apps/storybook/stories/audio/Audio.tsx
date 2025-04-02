import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card";

import PropTypes from "prop-types";

export const Audio = ({ primary, backgroundColor, size, label, ...props }) => {
  return (
    <Card>
      <CardHeader>Header</CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

Audio.propTypes = {
  /** Is this the principal call to action on the page? */
  primary: PropTypes.bool,
  /** What background color to use */
  backgroundColor: PropTypes.string,
  /** How large should the button be? */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Optional click handler */
  onClick: PropTypes.func
};

Audio.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined
};
