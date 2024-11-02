# ConnectIn   

[Here is the live link.](https://www.connectin.mujahedali.com/)          
  
ConnectIn is a clone of the website Linkedin.          
LinkedIn is a social media platform dedicated to business and professional networking, accessible through both websites and mobile applications. Users can create detailed pro  files, highlighting their skills, experience, and projects, showcasing their technical expertise. Linkedin allows users to connect one another throught sending and ac cpeting connection requests.    
  - Languages: Javascript, Ruby, HTML, and CSS    
  - Frontend: React-Redux        
  - Backend: Ruby On Rails     
  - Database: PostgreSQL 
  - Hosting: Render    
  - Asset Storage: AWS Simple Cloud Storage (S3)  
   
# Features

## User Authentication 
Users can effortlessly create accounts through the signup page or log in if they already have an existing account.

## Profiles
Upon logging in or signing up, users can personalize their profiles by updating their profile picture and background. Their profile page displays their current and past experiences. Each experience displays how many months they wokred in the specefic role. Currently a user can only add experiences.

![authMe](/frontend/src//components/assests/gifs/authMe.gif)

```js
if (!user) {
    return (
      <h1>Loading</h1>
    );
  }
  if (user) {
    return (
      
      
      <div className="profilePageWrapper">
        

        { type && 
          <div className="profilePicModalWrapper">
            < ProfilePicModal />
          </div>
        }
        { type2 && 
          <div className="profileBannerPicModalWrapper">
            < ProfileBannerModal />
          </div>
        }
        <div className="feedNavigationWrapper">
          <NavigationBar />
        </div>

        <div className="profilePageContentWrapper">
          <div className='profileBannerWrapper'>
            
            <ProfileBanner user={user} />
          </div>
          <div className="profileLinkInfoWrapper">
            <div className="profileLinkContainer">
              <h2>Public profile & URL</h2>
              <p>{`${window.location.href}`} </p>
            </div>
            
          </div>
          
          <ExperienceIndex userId={userId} className="profileExperienceIndex" />
          
          

        </div>
      </div>

    );
```

## Feed
In the feed page, a user is able to create a post, that is limited to 3000 characters. The user is able to able to attach a single phote. A user is able to edit their post by changing the description they have provided. If the user would like to remove a post, the user is capable of deleting their post as well.  

![postCrud](/frontend/src//components/assests/gifs/postCrud.gif)

### Creating a Post Modal
```js
<dialog open className="feedPostModal" onSubmit={handleSubmitPost}>
      <div className="feedPostUserInfo">
        <img className="feedModalUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
        <h1 className="feedPostName">{`${firstName}  ${lastName}`}</h1>
        <img className="feedCloseButton" src={closeButton} onClick={handleCloseModal} height='20' width='20' alt="close" />
      </div>
      <form className="feedPostModalForm" action="submit">
        <label htmlFor="postDescription"></label>
        <textarea id="postDescription" className="feedPostModalTextBox" 
          type="textarea" placeholder="What do you want to talk about?" 
          maxLength='3000' value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={handleFile} />
        <button className="feedModalPostButton" 
          type="submit"
          disabled={description.length === 0} >
          Post 
        
        </button>
      </form>
    </dialog>

```

# Future Implementation 
In the future I would also would like users to be able to connect with one and another through connections. Additionally, I aim to introduce instant messaging capabilities. I also want users to be able to comment and like each other's posts. 
