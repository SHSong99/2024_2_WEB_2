// src/hooks/useProjectForm.js
import { useState } from "react";

const useProjectForm = () => {
  // 입력 폼 요소들의 상태
  const [teamName, setTeamName] = useState(null);
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [semester, setSemester] = useState(""); // 1,2

  // 프로젝트 년도 선택 상태관리
  // 원래 ""이었으나, null로 변경 -> "" 설정하고 props 전달하니까 "is not a function"
  const [projectYear, setProjectYear] = useState(null);

  // 팀장 선택 상태관리
  const [isLeader, setIsLeader] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", image: null, role: "" },
  ]);

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);

  // 입력 필드 글자 수 제한
  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState(0);
  const [inputSummary, setInputSummary] = useState(0);

  // 기술 스택 선택 상태
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  // 업로드 관련 상태
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState({});

  // 핸들러 함수들

  // 썸네일 및 일반 이미지 업로드 핸들러
  const handleImgUpload = (file, type, index = null) => {
    if (!file.type.startsWith("image/")) {
      const key = type === "thumbnail" ? "thumbnail" : `image${index}`;
      setErrorMessage((prev) => ({
        ...prev,
        [key]: "이미지 파일만 업로드할 수 있습니다.",
      }));
      return;
    }

    if (type === "thumbnail") {
      setThumbnail(file);
    } else if (type === "image") {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }

    // 에러 메시지 초기화
    const key = type === "thumbnail" ? "thumbnail" : `image${index}`;
    setErrorMessage((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  // 팀원 이름 입력 포커스 핸들러
  const handleMemberNameFocus = (e, index) => {
    if (index === 0 && !isLeader) {
      alert("첫 번째 팀원으로는 팀장을 입력해주세요.");
      setIsLeader(true);
    }
  };

  // 팀원 이름 변경 핸들러
  const handleMemberNameChange = (e, index) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index].name = e.target.value;
    setTeamMembers(newTeamMembers);
  };

  // 팀원 이미지 업로드 핸들러
  const handleMemberImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newTeamMembers = [...teamMembers];
      newTeamMembers[index].image = file;
      setTeamMembers(newTeamMembers);
    }
  };

  // 팀원 역할 변경 핸들러
  const handleRoleChange = (e, index) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index].role = e.target.value;
    setTeamMembers(newTeamMembers);
  };

  // 팀원 추가 핸들러
  // 팀원 추가 핸들러
  const addTeamMember = () => {
    const lastMember = teamMembers[teamMembers.length - 1];
    // 마지막 팀원의 이름이 비어있지 않고, 역할이 비어있지 않은 경우에만 추가
    if (lastMember.name.trim() !== "" && lastMember.role.trim() !== "") {
      setTeamMembers([...teamMembers, { name: "", image: null, role: "" }]);
    } else {
      alert("모든 필드를 입력해 주세요."); // 사용자에게 알림 추가
    }
  };

  // 입력 글자 수 제한 핸들러
  const handleInputLimit = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setInputTitle(value.length);
        break;
      case "content":
        setInputContent(value.length);
        break;
      case "summary":
        setInputSummary(value.length);
        break;
      case "teamName":
        setTeamName(value);
        break;
      // 다른 필드가 있다면 여기에 추가
      default:
        break; // 아무것도 하지 않음
    }
  };

  // 기술 스택 선택 핸들러
  const toggleTechStack = (techStack) => {
    setSelectedTechStacks((prevSelected) => {
      const existing = prevSelected.find(
        (item) => item.techStackName === techStack.techStackName
      );

      if (existing) {
        return prevSelected.filter(
          (name) => name.techStackName !== techStack.techStackName
        );
      } else {
        return [...prevSelected, techStack]; // 기술 스택 객체 전체를 추가
      }
    });
  };

  const resetForm = () => {
    setTeamName("");
    setTitle("");
    setProjectType("");
    setContent("");
    setSummary("");
    setSemester("");
    setProjectYear("");
    setIsLeader(false);
    setTeamMembers([{ name: "", image: null, role: "" }]);
    setThumbnail(null);
    setImages([null, null, null, null]);
    setErrorMessage({});
    setSelectedTechStacks([]);
    setUploadError(null);
  };

  // 유효성 검사 함수
  const validateForm = () => {
    const errors = {};

    const requiredFields = [
      {
        value: teamName,
        fieldName: "teamName",
        message: "팀 이름을 입력해주세요.",
      },
      // {
      //   value: title,
      //   fieldName: "title",
      //   message: "프로젝트 제목을 입력해주세요.",
      // },
      {
        value: summary,
        fieldName: "summary",
        message: "한줄 소개를 입력해주세요.",
      },
      {
        value: projectType,
        fieldName: "projectType",
        message: "프로젝트 타입을 선택해주세요.",
      },
      {
        value: thumbnail,
        fieldName: "thumbnail",
        message: "썸네일 이미지를 업로드해주세요.",
      },
    ];

    requiredFields.forEach(({ value, fieldName, message }) => {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[fieldName] = message;
      }
    });

    setErrorMessage(errors);

    return Object.keys(errors).length === 0;
  };

  return {
    // 상태
    teamName,
    setTeamName,
    title,
    setTitle,
    projectType,
    setProjectType,
    content,
    setContent,
    summary,
    setSummary,
    semester,
    setSemester,
    projectYear,
    setProjectYear,
    teamMembers,
    thumbnail,
    images,
    selectedTechStacks,
    teamMembers,

    inputTitle,
    inputContent,
    inputSummary,
    uploading,
    uploadError,
    errorMessage,

    // 핸들러
    handleImgUpload,
    handleMemberNameFocus,
    handleMemberNameChange,
    handleMemberImageUpload,
    handleRoleChange,
    addTeamMember,
    handleInputLimit,
    toggleTechStack,
    resetForm,
    validateForm,
  };
};

export default useProjectForm;
