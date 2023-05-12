import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as URL from '../util/URL'

const RequireAuth = ({ children, allowedFeatureId }) => {
    const selectedFeatures = useSelector(state => state.selectedFeature );
    const location = useLocation();


    let isAllowed = selectedFeatures.map(feature => 
        feature.children.length <= 0 && feature.id === allowedFeatureId ? true :
        feature.children.some(child => child.id === allowedFeatureId ))
        
    return (
        isAllowed.includes(true) ? children : 
            isAllowed <= 0 ? 
                <Navigate to={`/${URL.LOGIN}`} state={{ from: location }} replace /> :
                <Navigate to={`/${URL.FORBIDDEN}`} replace />
    )
}

export default RequireAuth;