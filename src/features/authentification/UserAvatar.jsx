import styled from "styled-components";
import avatar from "../../assets/profil.png";
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const user = {
    fullName: "Azyz Hcini",
    avatar: avatar, // Change this to your default user image
  };

  return (
    <StyledUserAvatar>
      <Avatar src={user.avatar} alt={"azyz"} />
      <span>{user.fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
