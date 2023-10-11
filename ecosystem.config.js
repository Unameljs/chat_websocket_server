module.exports = {
    apps : [{
      script    : "./index.ts",
      instances : "max",
      exec_mode : "cluster"
    }]
  }