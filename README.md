# onedrive-autosync-to-google-photos

Scripts that will pick up photos from OneDrive and copy them to Google Photos. My use case for this 
is to display my personal photos on Google Chromecast's ambient mode without maintaining my photos 
in multiple accounts.

## Registering OAuth Application

TODO: OneDrive - register app, redirect uris, OAuth 2.0 authorization endpoint is "consumers" for 
personal microsoft account users

TODO: Google - enable photos API, configure oauth screen (external/test mode), add redirect uri 
including query parameter `?account=google_photos`