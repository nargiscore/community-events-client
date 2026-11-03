export default function Avatar({ user, size = "w-10" }) {
  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();
  return (
    <div className="avatar avatar-placeholder">
      <div className={`${size} rounded-full bg-primary text-primary-content ring-2 ring-primary/30`}>
        {user?.image ? (
          <img src={user.image} alt={user.name || "Profile"} referrerPolicy="no-referrer" />
        ) : (
          <span className="font-bold">{initial}</span>
        )}
      </div>
    </div>
  );
}
