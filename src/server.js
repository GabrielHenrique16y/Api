import app from './app';

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`You server is running on port ${port}`)
});
