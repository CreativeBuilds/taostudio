# Tao Studio Frontend

This is currently not the frontend used, but a rework of the site to add new features.

### Install and build
install dependencies - `npm install`
build app - `npx parcel src/index.html`


### Goals

Some goals include:
- Keeping a keyboard only layout
    - The site should work fully just with keyboard commands, no need for mouse
- Support X images on screen
    - Currently only 3 or 4 images are shown on screen at any one time and are quite small
    - Images on mobile should take up maximum width resolution and be shown in a single column
    - When an image is clicked/tapped it should pop up with the ability to generate from that image
        - Somehow this screen should also allow you to edit the prompt (maybe a pencil icon, that when hit animates up the input field for changing prompt generation settings)
- Keep image generation simple, What does the user want in the image (prompt) what do they not want (negative prompt) and what size do they want the image
    - There are two types of requests
        - The simple request as stated above
        - a more advanced options menu which allows the user to define more options, such as CFG (guidance scale), Image Strength for img2img, and a few more
            - the user should be able to access advanced variables with some sort of toggle inside an options menu? (subject to change on location)
- Needs a navigation system
    - Default home page should allow the user to generate images when they first arrive to the site like normal
    - Menu button on mobile, side menu on desktop should allow navigation to other screens
        - Generation/Prompting screen
        - Gallery of public images from authenticated accounts