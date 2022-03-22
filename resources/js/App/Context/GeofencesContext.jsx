import React, {useReducer, useContext} from "react";
import * as TYPES from "./types";
import swal from "sweetalert";
import {GeofencesAPI} from "../API";
import {useHistory} from "react-router";
import {AlertContext} from "./AlertContext";
import Cookies from "js-cookie";
import {NotificationsContext} from "./NotificationsContext";
import {AdminContext} from "./AdminContext";

const GeofencesContext = React.createContext();

const GeofencesState = (props) => {
    const initialState = {
        loading: false,
        geofences: [],
        geofenceTypes: [],
        IOTDevices: [],
        users: [],
        totalGeofencesNo: 0,
        geofence: {},
        geofencesFilterMode: "all",
        message: "",
        errors: {},
        status: 0,
        inputsState: {
            points_list_circular: [],
            points_list_polygon: [[], [], []],
        },
    };
    const {logout} = useContext(AdminContext);
    const {addNotification} = useContext(NotificationsContext);
    const {setAlert} = useContext(AlertContext);
    const history = useHistory();

    const [state, dispatch] = useReducer(geofenceReducer, initialState);

    async function setInput(e, index) {
        let inputsState = {...state.inputsState};

        switch (e.target.name) {
            case "geofence_id":
                // inputsState.IOTDevice_id = state.geofences.find((geofence) => geofence.id === Number(e.target.value)) && state.geofences.find((geofence) => geofence.id === Number(e.target.value)).i_o_t_device != null ? state.geofences.find((geofence) => geofence.id === Number(e.target.value)).i_o_t_device.id : '';
                // inputsState.associated_users = state.geofences.find((geofence) => geofence.id === Number(e.target.value)) ? state.geofences.find((geofence) => geofence.id === Number(e.target.value)).associated_users.map((user) => user.id) : [];
                inputsState.geofence_id = e.target.value;
                // inputsState.defDevice = inputsState.IOTDevice_id ? [state.geofences.find((device)=>device.id===Number(inputsState.IOTDevice_id))] : [];
                // inputsState.defUsers = inputsState.associated_users ? state.geofences.filter((user)=> inputsState.associated_users.includes(user.id)) : [];
                break;
            case "model_manual":
                inputsState.model_data_id = "";
                break;
            case "model_auto":
                inputsState.model_data_id = "";
                inputsState.signature_file = "";
                inputsState.model_file = "";
                break;
            case "radius":
                inputsState.radius = Number(e.target.value) ? Number(e.target.value) : "";
                break;
            case "points_list_circular_x":
                inputsState["points_list_circular"][0] = Number(e.target.value) ? Number(e.target.value) : "";
                break;
            case "points_list_circular_y":
                inputsState["points_list_circular"][1] = Number(e.target.value) ? Number(e.target.value) : "";
                break;
            case "points_list_polygon_x":
                inputsState["points_list_polygon"][index][0] = Number(e.target.value) ? Number(e.target.value) : "";
                break;
            case "points_list_polygon_y":
                inputsState["points_list_polygon"][index][1] = Number(e.target.value) ? Number(e.target.value) : "";
                break;
            case "preprocessing_file":
                inputsState = { ...inputsState, [e.target.name]: e.target.files[0], };
                break;
            default:
                console.log("normal");
                inputsState = { ...inputsState, [e.target.name]: e.target.value, };
        }
        await dispatch({
            type: TYPES.SET_INPUT_VALUE,
            payload: {
                inputsState: inputsState,
            },
        });
        console.log(state.inputsState);
    }

    function resetAllInputs() {
        dispatch({
            type: TYPES.RESET_ALL_INPUTS,
            payload: {
                inputsState: {
                    points_list_circular: [],
                    points_list_polygon: [[], [], []],
                },
            },
        });
        console.log(state.inputsState);
    }

    function resetAllErrors() {
        dispatch({
            type: TYPES.RESET_ALL_ERRORS,
            payload: {
                errors: {},
            },
        });
        console.log(state.inputsState);
    }

    function setGeofencesFilterMode(mode) {
        dispatch({
            type: TYPES.SET_OBJECTS_FILTER_MODE,
            payload: {
                geofencesFilterMode: mode,
            },
        });
        console.log(mode);
    }

    function addPoint() {
        // console.log(state.pointsNumber);

        let points_list_polygon = [...state.inputsState.points_list_polygon];
        points_list_polygon.push([]);

        dispatch({
            type: TYPES.SET_POINTS_NUMBER,
            payload: {
                points_list_polygon: points_list_polygon,
            },
        });
    }

    function removePoint() {
        if (state.inputsState.points_list_polygon.length > 3) {
            let points_list_polygon = [
                ...state.inputsState.points_list_polygon,
            ];
            points_list_polygon.pop();

            dispatch({
                type: TYPES.SET_POINTS_NUMBER,
                payload: {
                    points_list_polygon: points_list_polygon,
                },
            });
        }
    }

    // const getAllModels = async () => {
    //     dispatch({type: TYPES.SET_LOADING});

    //     const resp = await GeofencesAPI.get(`/models/all`, {
    //         headers: {
    //             Authorization: `Bearer ${
    //                 JSON.parse(Cookies.get("admin")).api_token.access_token
    //             }`,
    //         },
    //     })
    //         .then(async (response) => {
    //             console.log("all models");
    //             console.log(response);
    //             if (
    //                 response.hasOwnProperty("data") &&
    //                 response.data.errorNum === "S000"
    //             ) {
    //                 dispatch({
    //                     type: TYPES.GET_ALL_MODELS,
    //                     payload: {
    //                         models: response.data.models,
    //                         message: response.data.message,
    //                         status: response.data.status,
    //                     },
    //                 });
    //             } else if (
    //                 response.hasOwnProperty("data") &&
    //                 (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                ) {
    //                 await logout();
    //                     history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
    //                 swal({
    //                     title: "Sorry!",
    //                     text: error.response.data.message,
    //                     icon: "error",
    //                     button: "OK",
    //                 });
    //             } else {
    //                 dispatch({
    //                     type: TYPES.GENERAL_ERRORS,
    //                     payload: {
    //                         message: response.data.message,
    //                         status: response.data.status,
    //                     },
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             if (error.hasOwnProperty("response")) {
    //                 dispatch({
    //                     type: TYPES.VALIDATION_ERRORS,
    //                     payload: {
    //                         message: error.response.data.message,
    //                         errors: error.response.data.errors,
    //                         status: error.response.status,
    //                     },
    //                 });
    //                 console.log(error);
    //                 swal({
    //                     title: "Sorry!",
    //                     text: error.response.data.message,
    //                     icon: "error",
    //                     button: "OK",
    //                 });
    //             }
    //         });
    // };

    const getAllGeofenceTypes = async () => {
        dispatch({type: TYPES.SET_LOADING});

        const resp = await GeofencesAPI.get(`/get-geofence-types`, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(Cookies.get("admin")).api_token.access_token
                }`,
            },
        })
            .then(async (response) => {
                console.log("all geofences types");
                console.log(response);
                if (
                    response.hasOwnProperty("data") &&
                    response.data.errorNum === "S000"
                ) {
                    dispatch({
                        type: TYPES.GET_ALL_OBJECTS,
                        payload: {
                            geofenceTypes: response.data.geofenceTypes,
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                } else if (
                    response.hasOwnProperty("data") &&
                    (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                ) {
                    await logout();
                        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                } else {
                    dispatch({
                        type: TYPES.GENERAL_ERRORS,
                        payload: {
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                }
            })
            .catch((error) => {
                if (error.hasOwnProperty("response")) {
                    dispatch({
                        type: TYPES.VALIDATION_ERRORS,
                        payload: {
                            message: error.response.data.message,
                            errors: error.response.data.errors,
                            status: error.response.status,
                        },
                    });
                    console.log(error);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                }
            });
    };

    const getAllGeofences = async () => {
        dispatch({type: TYPES.SET_LOADING});

        const resp = await GeofencesAPI.get(`/all`, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(Cookies.get("admin")).api_token.access_token
                }`,
            },
        })
            .then(async (response) => {
                console.log("all geofences");
                console.log(response);
                if (
                    response.hasOwnProperty("data") &&
                    response.data.errorNum === "S000"
                ) {
                    dispatch({
                        type: TYPES.GET_ALL_OBJECTS,
                        payload: {
                            geofences: response.data.geofences_data.geofences,
                            totalGeofencesNo:
                            response.data.geofences_data.totalGeofencesNo,
                            geofencesFilterMode: "all",
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                } else if (
                    response.hasOwnProperty("data") &&
                    (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")
                ) {
                    await logout();
                        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                } else {
                    dispatch({
                        type: TYPES.GENERAL_ERRORS,
                        payload: {
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                }
            })
            .catch((error) => {
                if (error.hasOwnProperty("response")) {
                    dispatch({
                        type: TYPES.VALIDATION_ERRORS,
                        payload: {
                            message: error.response.data.message,
                            errors: error.response.data.errors,
                            status: error.response.status,
                        },
                    });
                    console.log(error);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                }
            });
    };

    const getAllGeofenceMatchingData = async () => {
        dispatch({type: TYPES.SET_LOADING});

        const resp = await GeofencesAPI.get(`/geofence-matching/get-data`, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(Cookies.get("admin")).api_token.access_token
                }`,
            },
        })
            .then(async (response) => {
                console.log("all geofence matching data");
                console.log(response);
                if (
                    response.hasOwnProperty("data") &&
                    response.data.errorNum === "S000"
                ) {
                    dispatch({
                        type: TYPES.GET_ALL_GEOFENCES_MATCHING_DATA,
                        payload: {
                            geofences:
                            response.data.geofence_matching_data.geofences,
                            IOTDevices:
                            response.data.geofence_matching_data.IOTDevices,
                            users: response.data.geofence_matching_data.users,
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                } else if (
                    response.hasOwnProperty("data") &&
                    (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                ) {
                    await logout();
                        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                } else {
                    dispatch({
                        type: TYPES.GENERAL_ERRORS,
                        payload: {
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                }
            })
            .catch((error) => {
                if (error.hasOwnProperty("response")) {
                    dispatch({
                        type: TYPES.VALIDATION_ERRORS,
                        payload: {
                            message: error.response.data.message,
                            errors: error.response.data.errors,
                            status: error.response.status,
                        },
                    });
                    console.log(error);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                }
            });
    };

    const MatchGeofenceData = async (inputsState) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, These data will be added",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willAdd) => {
            if (willAdd) {
                inputsState = {...inputsState, geofence_location_type: false};
                console.log(inputsState);
                dispatch({type: TYPES.SET_LOADING});

                const resp = await GeofencesAPI.put(
                    `/geofence-matching/match`,
                    inputsState,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(Cookies.get("admin")).api_token
                                    .access_token
                            }`,
                        },
                    }
                )
                    .then(async (response) => {
                        console.log("Match geofence data");
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.ADD_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                    errors: {},
                                },
                            });
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_matched",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                            swal({
                                title: "Good job!",
                                text: response.data.message,
                                icon: "success",
                                button: "Done!",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "S004" ||
                                response.data.errorNum === "S003")
                        ) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    errors: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "The given data was invalid.",
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/geofenceMatching`);
                            });
                        }
                    });
            } else {
                swal("The geofence data have not been matched!");
            }
        });
    };

    const getGeofenceById = async (id) => {
        dispatch({type: TYPES.SET_LOADING});

        const resp = await GeofencesAPI.get(`/get-geofence/${id}`, {
            params: {id: id},
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(Cookies.get("admin")).api_token.access_token
                }`,
            },
        })
            .then(async (response) => {
                console.log("get geofence");
                console.log(response.data.geofence);
                if (
                    response.hasOwnProperty("data") &&
                    response.data.errorNum === "S000"
                ) {
                    dispatch({
                        type: TYPES.GET_OBJECT_BY_ID,
                        payload: {
                            geofence: response.data.geofence,
                            inputsState: {
                                ...response.data.geofence,
                                geofence_location_type: response.data.geofence
                                    .geofence_location_type
                                    ? "active"
                                    : "passive",
                                points_list_circular:
                                    response.data.geofence.points_list &&
                                    response.data.geofence.geofence_type ===
                                    "circular"
                                        ? response.data.geofence.points_list[0]
                                        : [],
                                points_list_polygon:
                                    response.data.geofence.points_list &&
                                    response.data.geofence.geofence_type ===
                                    "polygon"
                                        ? response.data.geofence.points_list
                                        : [[], [], []],
                            },
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                    console.log(state.inputsState);
                } else if (
                    response.hasOwnProperty("data") &&
                    (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                ) {
                    await logout();
                        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                } else {
                    dispatch({
                        type: TYPES.GENERAL_ERRORS,
                        payload: {
                            message: response.data.message,
                            status: response.data.status,
                        },
                    });
                }
            })
            .catch((error) => {
                if (error.hasOwnProperty("response")) {
                    dispatch({
                        type: TYPES.VALIDATION_ERRORS,
                        payload: {
                            message: error.response.data.message,
                            errors: error.response.data.errors,
                            status: error.response.status,
                        },
                    });
                    console.log(error);
                    swal({
                        title: "Sorry!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "OK",
                    });
                }
            });
    };

    const addPassiveGeofence = async (inputsState) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, This geofence will be added",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willAdd) => {
            if (willAdd) {
                console.log(inputsState);
                dispatch({type: TYPES.SET_LOADING});

                const resp = await GeofencesAPI.post(
                    `/addPassive`,
                    inputsState,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(Cookies.get("admin")).api_token
                                    .access_token
                            }`,
                        },
                    }
                )
                    .then(async (response) => {
                        console.log("Add geofence");
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.ADD_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                    errors: {},
                                },
                            });
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_added",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                            swal({
                                title: "Good job!",
                                text: response.data.message,
                                icon: "success",
                                button: "Done!",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "S004" ||
                                response.data.errorNum === "S003")
                        ) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    errors: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "The given data was invalid.",
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/addGeofence`);
                            });
                        }
                    });
            } else {
                swal("The geofence has not been added!");
            }
        });
    };

    const addCircularGeofence = (inputsState) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, This geofence will be added",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willAdd) => {
            if (willAdd) {
                inputsState = {...inputsState, geofence_location_type: true};
                dispatch({type: TYPES.SET_LOADING});
                const resp = await GeofencesAPI.post(
                    `/addCircular`,
                    inputsState,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(Cookies.get("admin")).api_token
                                    .access_token
                            }`,
                        },
                    }
                )
                    .then(async (response) => {
                        console.log("Add geofence");
                        console.log(response);
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.ADD_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                    errors: {},
                                },
                            });
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_added",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                            swal({
                                title: "Good job!",
                                text: response.data.message,
                                icon: "success",
                                button: "Done!",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "S004" ||
                                response.data.errorNum === "S003")
                        ) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    errors: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "The given data was invalid.",
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/addGeofence`);
                            });
                        }
                    });
            } else {
                swal("The geofence has not been added!");
            }
        });
    };

    const addPolygonGeofence = (inputsState) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, This geofence will be added",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willAdd) => {
            if (willAdd) {
                inputsState = {...inputsState, geofence_location_type: true};
                dispatch({type: TYPES.SET_LOADING});
                const resp = await GeofencesAPI.post(
                    `/addPolygon`,
                    inputsState,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(Cookies.get("admin")).api_token
                                    .access_token
                            }`,
                        },
                    }
                )
                    .then(async (response) => {
                        console.log("Add geofence");
                        console.log(response);
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.ADD_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                    errors: {},
                                },
                            });
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_added",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                            swal({
                                title: "Good job!",
                                text: response.data.message,
                                icon: "success",
                                button: "Done!",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "S004" ||
                                response.data.errorNum === "S003")
                        ) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    errors: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "The given data was invalid.",
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/addGeofence`);
                            });
                        }
                    });
            } else {
                swal("The geofence has not been added!");
            }
        });
    };

    const updateGeofence = (id, inputsState) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, This geofence will be updated",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willUpdate) => {
            if (willUpdate) {
                dispatch({type: TYPES.SET_LOADING});
                if (!(inputsState instanceof FormData)) {
                    inputsState.geofence_location_type = inputsState.geofence_location_type === "active" ? true : false;
                }
                    console.log(inputsState);
                const resp = await GeofencesAPI.post(
                    `/update/${id}`,
                    inputsState,
                    {
                        params: {id: id},
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(Cookies.get("admin")).api_token
                                    .access_token
                            }`,
                        },
                    }
                )
                    .then(async (response) => {
                        console.log("Update geofence");
                        console.log(response);
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.UPDATE_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                    errors: {},
                                },
                            });
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_updated",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                            swal({
                                title: "Good job!",
                                text: response.data.message,
                                icon: "success",
                                button: "Done!",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "S004" ||
                                response.data.errorNum === "S003")
                        ) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    errors: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "The given data was invalid.",
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/editGeofence/${id}`);
                            });
                        }
                    });
            } else {
                swal("The geofence has not been updated!");
            }
        });
    };

    const deleteGeofence = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once Clicked, This geofence will be deleted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch({type: TYPES.SET_LOADING});
                const resp = await GeofencesAPI.delete(`/delete/${id}`, {
                    params: {id: id},
                    headers: {
                        Authorization: `Bearer ${
                            JSON.parse(Cookies.get("admin")).api_token
                                .access_token
                        }`,
                    },
                })
                    .then(async (response) => {
                        console.log("Delete geofence");
                        if (
                            response.hasOwnProperty("data") &&
                            response.data.errorNum === "S000"
                        ) {
                            dispatch({
                                type: TYPES.DELETE_OBJECT,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            await setAlert(
                                "pink",
                                "Geofence has been deleted successfully"
                            );
                            await getAllGeofences();
                            addNotification({
                                type: "log",
                                title: "geofence_has_been_deleted",
                                description: `${
                                    JSON.parse(Cookies.get("admin")).username
                                }`,
                                image: JSON.parse(Cookies.get("admin")).image
                                    ? JSON.parse(Cookies.get("admin")).image
                                    : null,
                            });
                        } else if (
                            response.hasOwnProperty("data") &&
                            (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")                        ) {
                            await logout();
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            });
                        } else {
                            dispatch({
                                type: TYPES.GENERAL_ERRORS,
                                payload: {
                                    message: response.data.message,
                                    status: response.data.status,
                                },
                            });
                            swal({
                                title: "Sorry!",
                                text: "Something went wrong.",
                                icon: "error",
                                button: "OK",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.hasOwnProperty("response")) {
                            dispatch({
                                type: TYPES.VALIDATION_ERRORS,
                                payload: {
                                    message: error.response.data.message,
                                    errors: error.response.data.errors,
                                    status: error.response.status,
                                },
                            });
                            console.log(error);
                            swal({
                                title: "Sorry!",
                                text: error.response.data.message,
                                icon: "error",
                                button: "OK",
                            }).then(async (value) => {
                                history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all`);
                            });
                        }
                    });
            } else {
                swal("The geofence has not been deleted!");
            }
        });
    };

    return (
        <GeofencesContext.Provider
            value={{
                loading: state.loading,
                message: state.message,
                status: state.status,
                errors: state.errors,

                IOTDevices: state.IOTDevices,
                users: state.users,
                geofence: state.geofence,
                geofences: state.geofences,
                totalGeofencesNo: state.totalGeofencesNo,
                getAllGeofenceTypes,
                // getAllModels,
                getAllGeofences,
                getAllGeofenceMatchingData,
                MatchGeofenceData,
                getGeofenceById,
                addPassiveGeofence,
                addCircularGeofence,
                addPolygonGeofence,
                updateGeofence,
                deleteGeofence,

                geofencesFilterMode: state.geofencesFilterMode,
                setGeofencesFilterMode,

                removePoint,
                addPoint,

                inputsState: state.inputsState,
                setInput,
                resetAllInputs,
                resetAllErrors,
            }}
        >
            {props.children}
        </GeofencesContext.Provider>
    );
};

const geofenceReducer = (state, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case TYPES.SET_INPUT_VALUE:
            return {
                ...state,
                inputsState: action.payload.inputsState ? action.payload.inputsState : {},
            };
        case TYPES.RESET_ALL_INPUTS:
            return {
                ...state,
                inputsState: action.payload.inputsState ? action.payload.inputsState : {},
            };
        case TYPES.RESET_ALL_ERRORS:
            return {
                ...state,
                errors: action.payload.errors,
            };
        case TYPES.VALIDATION_ERRORS:
            return {
                ...state,
                message: action.payload.message,
                errors: action.payload.errors,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.GENERAL_ERRORS:
            return {
                ...state,
                message: action.payload.message,
                errors: action.payload.errors ? action.payload.errors : {},
                status: action.payload.status,
                loading: false,
            };

        case TYPES.SET_POINTS_NUMBER:
            return {
                ...state,
                inputsState: {
                    ...state.inputsState,
                    points_list_polygon: action.payload.points_list_polygon,
                },
            };

        case TYPES.SET_OBJECTS_FILTER_MODE:
            return {
                ...state,
                geofencesFilterMode: action.payload.geofencesFilterMode ? action.payload.geofencesFilterMode : "all",
            };
        case TYPES.GET_ALL_OBJECTS:
        case TYPES.GET_ALL_GEOFENCES_MATCHING_DATA:
            return {
                ...state,
                geofences: action.payload.geofences ? action.payload.geofences : [],
                geofenceTypes: action.payload.geofenceTypes ? action.payload.geofenceTypes : [],
                IOTDevices: action.payload.geofences ? action.payload.IOTDevices : [],
                users: action.payload.users ? action.payload.users : [],
                message: action.payload.message,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.GET_OBJECT_BY_ID:
            return {
                ...state,
                geofence: action.payload.geofence
                    ? action.payload.geofence
                    : {},
                inputsState: action.payload.inputsState
                    ? action.payload.inputsState
                    : {},
                message: action.payload.message,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.GET_OBJECT_BY_ID_ERRORS:
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.ADD_OBJECT:
            return {
                ...state,
                message: action.payload.message,
                errors: action.payload.errors,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.UPDATE_OBJECT:
            return {
                ...state,
                message: action.payload.message,
                inputsState: action.payload.inputsState,
                errors: action.payload.errors,
                status: action.payload.status,
                loading: false,
            };
        case TYPES.DELETE_OBJECT:
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status,
                loading: false,
            };
        default:
            return state;
    }
};

export {GeofencesContext, GeofencesState};
