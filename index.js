(async () => {
    try {
        const lib = await import('./pkg');
        lib.greet();
    } catch (err) {
        console.error(err);
    }
})();
