## If you would like to submit a PR for the ecosystem page, please follow the following formats!

#### For social icons in the card footers, we use bootstrap icons. Please find the icon you'd like from this list if you don't see below: https://icons.getbootstrap.com. Additionally, we use "twitter-x" to display the X logo rather than the old "twitter" logo.

### Image guidelines:
- When adding images, the order of file type preference is: .svg>.webp>.png>.jpg
- If there is any pure white or black background to an image, please swap it for an in-between gray. Two images can be used, but the javascript for image swapping will need to be updated. If the javascript is not updated correctly, it will break all image swaps on the page. Unless you are very comfortable with JS, please default to using a single image.
- Target file size should be <50kb, this is crucial for fast page load times
- If there is a square image, rounding corners is preferred, however, not at the expense of a larger file size.
- There is a class for all images "card-img-standard" -- this should be used for most cards. However, if adding a very limited card (such as an Exchange (CEX), or any other card which won't have a description, please use the class "card-img-small". When using this smaller image format, other changes are needed as well (an example can also be found at the bottom of the doc):
  - \<h4> class needs the added "mb-0"
  - \<div class="d-flex flex-sm-row flex-column"> needs to be modified to \<div class="d-flex flex-sm-row flex-column align-items-center"> (adding the align-items-center class)

### Full Card with Media & Attribution
```
<div class="col mb-4">
  <div class="card" data-header="Media, Informational, Social"> <!--Tags for search. Please have these match the options listed in the data filters | data-filter="<tag>"-->
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="fs-6">Media</div> <!--Header Description-->
      <button class="btn btn-sm btn-outline-primary fs-7" disabled>Jeremy</button> <!--Attribution | Put the creator name. Please keep in line with other projects with this name-->
    </div>
    <div class="card-body text-center text-sm-start">
      <div class="d-flex flex-sm-row flex-column justify-content-between p-md-1">
        <div class="d-flex flex-sm-row flex-column">
          <div class="align-self-center">
            <img src="images/logosForEcosystem/square/BCHPodcast.svg" alt="Bitcoin Cash Podcast logo" class="card-img-standard me-0 me-sm-3 mb-3 mb-sm-0"> <!--Make sure to have an image and to properly update the alt tag-->
          </div>
          <div>
            <h4 class="text-break">Bitcoin Cash Podcast</h4> <!--Title-->
            <p class="mb-0 fs-6">Weekly podcast with a variety of guests discussing a wide range of topics tangential to BCH's rise to global reserve currency.</p> <!--Description-->
          </div>
        </div>
        <div class="align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0">
          <a href="https://bitcoincashpodcast.com" class="btn btn-lg btn-primary">Visit</a> <!--Primary Website-->
        </div>
      </div>
    </div>
    <div class="card-footer"> <!--Social Channels-->
      <a href="https://t.me/thebitcoincashpodcast_discussion" class="fs-5r text-secondary me-2"><i class="bi bi-telegram"></i></a>
      <a href="https://youtube.com/@BitcoinCashPodcast" class="fs-5r text-secondary me-2"><i class="bi bi-youtube"></i></a>
      <a href="https://x.com/TheBCHPodcast" class="fs-5r text-secondary me-2"><i class="bi bi-twitter-x"></i></a>
      <a href="https://reddit.com/r/BitcoinCashPodcast/" class="fs-5r text-secondary me-2"><i class="bi bi-reddit"></i></a>
      <a href="https://open.spotify.com/artist/4wyXjYROLQdNvL6qwgCerH?si=iovnYMJhToy9SoaK9FSniQ" class="fs-5r text-secondary me-2"><i class="bi bi-spotify"></i></a>
      <a href="https://podcasts.apple.com/us/podcast/the-bitcoin-cash-podcast/id1555355070" class="fs-5r text-secondary me-2"><i class="bi bi-mic"></i></a>
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
        <div class="d-flex flex-sm-row flex-column">
          <div class="align-self-center">
            <img src="images/logosForEcosystem/square/BCHPodcast.svg" alt="Bitcoin Cash Podcast logo" class="card-img-standard me-0 me-sm-3 mb-3 mb-sm-0"> <!--Make sure to have an image and to properly update the alt tag-->
          </div>
          <div>
            <h4 class="text-break">Bitcoin Cash Podcast</h4> <!--Title-->
            <p class="mb-0 fs-6">Weekly podcast with a variety of guests discussing a wide range of topics tangential to BCH's rise to global reserve currency.</p> <!--Description-->
          </div>
        </div>
        <div class="align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0">
          <a href="https://bitcoincashpodcast.com" class="btn btn-lg btn-primary">Visit</a> <!--Primary Website-->
        </div>
      </div>
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
      <div class="d-flex flex-sm-row flex-column justify-content-between p-md-1">
	<div class="d-flex flex-sm-row flex-column align-items-center">
	  <div class="align-self-center">
	    <img src="images/logosForEcosystem/square/coinbase.svg" alt="Coinbase logo" class="card-img-small me-0 me-sm-3 mb-3 mb-sm-0">
	  </div>
	  <div>
	    <h4 class="text-break mb-0">Coinbase</h4>
	  </div>
	</div>
	<div class="align-self-center ms-0 ms-sm-3 mt-3 mt-sm-0">
	  <a href="https://coinbase.com" class="btn btn-lg btn-primary">Visit</a>
	</div>
      </div>
    </div>
  </div>
</div>
```
