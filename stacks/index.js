import ColorStack from "./color_stack/ColorStack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new ColorStack(app, "ColorStack");

  // Add more stacks
}
