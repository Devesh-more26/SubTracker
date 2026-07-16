// Icon set sourced from `react-icons` (Feather — `fi`) so every page shares one
// consistent, well-drawn iconography. Re-exported under app-friendly names.
// `Logo` stays a custom SVG because it is the SubTracker brand mark (favicon).
import {
  FiMenu,
  FiX,
  FiHome,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiBell,
  FiCreditCard,
  FiBarChart2,
  FiShield,
  FiCalendar,
  FiUsers,
  FiZap,
  FiCheck,
  FiArrowRight,
  FiRefreshCw,
  FiMail,
  FiLock,
  FiUser,
  FiStar,
} from 'react-icons/fi'

export const Logo = ({ className = '', size = 32 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 48 46"
    fill="none"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
    />
  </svg>
)

export const Menu = FiMenu
export const Close = FiX
export const Home = FiHome
export const Plus = FiPlus
export const Pencil = FiEdit2
export const Trash = FiTrash2
export const Logout = FiLogOut
export const Bell = FiBell
export const Wallet = FiCreditCard
export const Chart = FiBarChart2
export const Shield = FiShield
export const Calendar = FiCalendar
export const Users = FiUsers
export const Sparkle = FiZap
export const Check = FiCheck
export const ArrowRight = FiArrowRight
export const Sync = FiRefreshCw
export const Mail = FiMail
export const Lock = FiLock
export const User = FiUser
export const Star = FiStar
