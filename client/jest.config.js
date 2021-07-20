module.exports = async () => {
    return {
        verbose: true,
        setupFilesAfterEnv: ["<rootDir>/jestSetupTests.js"],
    }
};



