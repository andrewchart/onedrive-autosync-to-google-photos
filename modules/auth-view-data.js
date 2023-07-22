/**
 * auth-view-data.js
 *
 * Constructs the required data for the auth.ejs view including details of the
 * currently authenticated user (if any) and the Oauth urls for OneDrive and 
 * Google Photos to authorise this application.
 * @param  req       Express request object
 * @return {Object}  Data for the view
 */
function authViewData(req) {
    const ONEDRIVE_OAUTH_URL = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";
    const onedrive_query = {
        client_id: process.env.ONEDRIVE_CLIENT_ID,
        redirect_uri: encodeURIComponent(
            'http' + (req.secure ? 's' : '') + '://' + req.headers.host 
                   + '/auth/callback?account=onedrive'
        ),
        response_type: 'code',
        scope: 'files.read',
        state: encodeURIComponent(process.env.API_KEY)
    }

    const GOOGLE_PHOTOS_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const google_photos_query = {
        client_id: process.env.GOOGLE_PHOTOS_CLIENT_ID,
        redirect_uri: encodeURIComponent(
            'http' + (req.secure ? 's' : '') + '://' + req.headers.host 
                   + '/auth/callback?account=google_photos'
        ),
        response_type: 'code',
        scope: encodeURIComponent('https://www.googleapis.com/auth/photoslibrary.appendonly'),
        state: encodeURIComponent(process.env.API_KEY)
    }

    return {
        onedrive_user: { 
          name: 'o', 
          account_id: '1'
        },

        google_photos_user: { 
          name: 'g', 
          account_id: '2'
        },

        onedrive_oauth_url: ONEDRIVE_OAUTH_URL + '?' +
            Object.keys(onedrive_query)
                .map(key => `${key}=${onedrive_query[key]}`)
                .join('&'),

        google_photos_oauth_url: GOOGLE_PHOTOS_OAUTH_URL + '?' +
            Object.keys(google_photos_query)
                .map(key => `${key}=${google_photos_query[key]}`)
                .join('&'),
    }
}

module.exports = authViewData;