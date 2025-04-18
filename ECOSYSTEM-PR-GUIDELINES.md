## If you would like to submit a PR for the ecosystem page, please follow the following formats!

#### For social icons in the card footers, we use bootstrap icons. Please find the icon you'd like from this list if you don't see below: https://icons.getbootstrap.com. Additionally, we use "twitter-x" to display the X logo rather than the old "twitter" logo.
##### For Tutorials, please use bi-patch-question

### Image guidelines:
- When adding images, the order of file type preference is: .svg>.webp>.jpg|.png (.jpg should only be used over .webp if giving smaller file size and no transparency; .png should rarely be used as .webp is more efficient and has transparency)
- If there is any pure white or black background to an image, please swap it for an in-between gray. Two images can be used, but the javascript for image swapping will need to be updated. If the javascript is not updated correctly, it will break all image swaps on the page. Unless you are very comfortable with JS, please default to using a single image.
- Target file size should be <30kb, this is crucial for fast page load times
- If the image is a square, and can be cropped, in the \<img> tag please add "ecosystemCircle" to the \<img> classes crop the image to a circle or "ecosystemRound" to give the image rounded corners. Rounded corners/circle crop is preferred, however, not necessary.
- There is a class for all images "card-img-standard" -- this should be used for most cards. However, if adding a very limited card (such as an Exchange (CEX), or any other card which won't have a description, please use the class "card-img-small". When using this smaller image format, other changes are needed as well (an example can also be found at the bottom of the doc):
  - \<h4> class needs the added "mb-0"
  - \<div class="d-flex flex-sm-row flex-column justify-content-between p-md-1"> needs to be modified to \<div class="d-flex flex-sm-row flex-column justify-content-between align-items-center p-md-1"> (adding the align-items-center class)

### Full Card with Media & Attribution
```
<div class="col mb-4">
  <div class="card" data-header="Media, Informational, Social"> <!--Tags for search. Please have these match the options listed in the data filters | data-filter="<tag>"-->
    <div class="card-header d-flex justify-content-between align-items-center">
	<div class="fs-6">Media</div>
	<button class="btn btn-sm btn-outline-primary fs-7" disabled>Jeremy</button> <!--Attribution | Put the creator name. Please keep in line with other projects with this name-->
    </div>
    <div class="card-body text-center text-sm-start">
      <div class="d-flex flex-sm-row flex-column justify-content-between p-md-1">
	<img src="images/Ecosystem/BCHPodcast.webp" alt="Bitcoin Cash Podcast logo" class="card-img-standard me-0 me-sm-3 mb-3 mb-sm-0 align-self-center"> <!--Make sure to have an image and to properly update the alt tag--> <!--Additionally, if needing to round corners add "ecosystemRound" or if needing to crop image to circle add: "ecosystemCircle" to the end of the class="" -->
	<div class="flex-grow-1">
	  <h4 class="text-break">Bitcoin Cash Podcast</h4> <!--Title-->
	  <p class="mb-0 fs-6">Weekly podcast with a variety of guests discussing a wide range of topics tangential to BCH's rise to global reserve currency.</p> <!--Description-->
	</div>
	<a href="https://bitcoincashpodcast.com" class="btn btn-lg btn-primary align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0" aria-label="Primary link">Visit</a> <!--Primary Website-->
      </div>
    </div>
    <div class="card-footer"> <!--Social Channels | Please include the proper aria-label for assessibility purposes -->
	<a href="https://t.me/thebitcoincashpodcast_discussion" class="fs-5r text-secondary me-2" aria-label="link to Telegram"><i class="bi bi-telegram"></i></a>
	<a href="https://youtube.com/@BitcoinCashPodcast" class="fs-5r text-secondary me-2" aria-label="link to youtube"><i class="bi bi-youtube"></i></a>
	<a href="https://x.com/TheBCHPodcast" class="fs-5r text-secondary me-2" aria-label="link to X (Twitter)"><i class="bi bi-twitter-x"></i></a>
	<a href="https://reddit.com/r/BitcoinCashPodcast/" class="fs-5r text-secondary me-2" aria-label="link to Reddit"><i class="bi bi-reddit"></i></a>
	<a href="https://open.spotify.com/artist/4wyXjYROLQdNvL6qwgCerH?si=iovnYMJhToy9SoaK9FSniQ" class="fs-5r text-secondary me-2" aria-label="link to Spotify"><i class="bi bi-spotify"></i></a>
	<a href="https://podcasts.apple.com/us/podcast/the-bitcoin-cash-podcast/id1555355070" class="fs-5r text-secondary me-2" aria-label="link to Apple Podcasts"><i class="bi bi-mic"></i></a>
    </div>
  </div>
</div>
```

### Full Card without Media nor Attribution
```
<div class="col mb-4">
  <div class="card" data-header="Media, Informational, Social"> <!--Tags for search. Please have these match the options listed in the data filters | data-filter="<tag>"-->
    <div class="card-header fs-6">Media</div> <!--If no attribution, replace the four lines above with this singular line-->
    <div class="card-body text-center text-sm-start">
      <div class="d-flex flex-sm-row flex-column justify-content-between p-md-1">
	<img src="images/Ecosystem/BCHPodcast.webp" alt="Bitcoin Cash Podcast logo" class="card-img-standard me-0 me-sm-3 mb-3 mb-sm-0 align-self-center"> <!--Make sure to have an image and to properly update the alt tag--> <!--Additionally, if needing to round corners add "ecosystemRound" or if needing to crop image to circle add: "ecosystemCircle" to the end of the class="" -->
	<div class="flex-grow-1">
	  <h4 class="text-break">Bitcoin Cash Podcast</h4> <!--Title-->
	  <p class="mb-0 fs-6">Weekly podcast with a variety of guests discussing a wide range of topics tangential to BCH's rise to global reserve currency.</p> <!--Description-->
	</div>
	<a href="https://bitcoincashpodcast.com" class="btn btn-lg btn-primary align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0" aria-label="Primary link">Visit</a> <!--Primary Website-->
      </div>
    </div>
    <div class="card-footer"> <!--Social Channels | Please include the proper aria-label for assessibility purposes -->
	<a href="https://t.me/thebitcoincashpodcast_discussion" class="fs-5r text-secondary me-2" aria-label="link to Telegram"><i class="bi bi-telegram"></i></a>
	<a href="https://youtube.com/@BitcoinCashPodcast" class="fs-5r text-secondary me-2" aria-label="link to youtube"><i class="bi bi-youtube"></i></a>
	<a href="https://x.com/TheBCHPodcast" class="fs-5r text-secondary me-2" aria-label="link to X (Twitter)"><i class="bi bi-twitter-x"></i></a>
	<a href="https://reddit.com/r/BitcoinCashPodcast/" class="fs-5r text-secondary me-2" aria-label="link to Reddit"><i class="bi bi-reddit"></i></a>
	<a href="https://open.spotify.com/artist/4wyXjYROLQdNvL6qwgCerH?si=iovnYMJhToy9SoaK9FSniQ" class="fs-5r text-secondary me-2" aria-label="link to Spotify"><i class="bi bi-spotify"></i></a>
	<a href="https://podcasts.apple.com/us/podcast/the-bitcoin-cash-podcast/id1555355070" class="fs-5r text-secondary me-2" aria-label="link to Apple Podcasts"><i class="bi bi-mic"></i></a>
    </div>
  </div>
</div>
```

### Small Card (without description)
```
<div class="col mb-4">
  <div class="card" data-header="Exchange, CEX">
    <div class="card-header fs-6">Exchange (CEX)</div>
    <div class="card-body text-center text-sm-start">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-center p-md-1">
	<img src="images/Ecosystem/coinbase.svg" alt="Coinbase logo" class="card-img-small me-0 me-sm-3 mb-3 mb-sm-0 align-self-center">
	<div class="flex-grow-1">
	  <h4 class="text-break mb-0">Coinbase</h4>
	</div>
	<a href="https://coinbase.com" class="btn btn-lg btn-primary align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0" aria-label="Primary link">Visit</a>
      </div>
    </div>
  </div>
</div>
```
