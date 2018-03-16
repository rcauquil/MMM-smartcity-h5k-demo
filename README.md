# MagicMirror Module: MMM-smartcity-h5k-demo
A MagicMirror Module for displaying data from haddock smarcity model.

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/rcauquil/MMM-smarcity-h5k-demo.git
````

Configure the module in your `config/config.js` file.

## Updating the module

If you want to update the `MMM-smartcity-h5k-demo` module to the latest version, use your terminal to go to the `MMM-smartcity-h5k-demo` module folder and type the following command:

````
git pull
````

If you haven't changed the modules, this should work without any problems.
Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
  module: "MMM-smartcity-h5k-demo",
  position: "top_right",
  header: "smartcity",
  config: {
    socketServer: "<the-socket-server-url>"
  }
]
````

## Configuration options
The following properties can be configured:

| Option          | Defaults
| --------------- | -----------
| `socketServer`  | -
