import styled from "styled-components";
import defaultAvatar from "../../assets/profil.png";
import { useAuth } from "../../context/AuthContext";

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
  const { user } = useAuth();

  const avatarSrc = user?.avatar || defaultAvatar;
  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Unknown User";

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={fullName} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
