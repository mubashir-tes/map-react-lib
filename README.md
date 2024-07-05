# React Component Library

## How to Test the Project as a Local Working Directory

### Step-by-Step Guide

1. **Create a Test Folder**
    - Create a new directory for both the React component library and the React template project.

    ```bash
    mkdir test-folder
    cd test-folder
    ```

2. **Clone the Repository on the Test Folder**
    - Clone your React component library repository into the test folder.

    ```bash
    git clone https://github.com/mubashir-tes/map-react-lib.git
    cd map-react-lib
    ```

3. **Install Dependencies**
    - Install the necessary dependencies for your library.

    ```bash
    npm install
    ```

4. **Build the Library**
    - Build your library to generate the necessary files for usage.

    ```bash
    npm run build
    ```

5. **Create a React Template Project**
    - Navigate back to the test folder and create a new React project.

    ```bash
    cd ..
    npx create-react-app my-react-app
    cd my-react-app
    ```

6. **Install Dependencies Using PNPM**
    - Ensure `pnpm` is installed globally on your system. If not, install it using `npm`.

    ```bash
    npm install -g pnpm
    ```

    - Install the dependencies for the React template project.

    ```bash
    pnpm install
    ```

7. **Install the Library Locally**
    - Link the local library to the React template project without publishing the library.

    ```bash
    pnpm install ../map-react-lib
    ```

8. **Check Dependency in `package.json`**
    - Ensure the dependency is correctly linked in the `package.json` file of the React template project. It should look like this:

    ```json
    "dependencies": {
      "maplibre-gl-react-create": "link:../map-react-lib"
    }
    ```

9. **Start the React Template Project**
    - Run the React template project to start the development server.

    ```bash
    pnpm run start
    ```

### Verification

- Ensure both the React template project and the React component library are in the test folder.
- You should be able to see the changes from your local library reflected in the React template project.
