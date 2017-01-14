file(GLOB HEADERS "include/capricorn/net/*.hpp")

set(SOURCES node.cpp
            stcp_socket.cpp
            core_messages.cpp
            peer_database.cpp
            peer_connection.cpp
            message_oriented_connection.cpp)

add_library( capricorn_net ${SOURCES} ${HEADERS} )

target_link_libraries( capricorn_net 
  PUBLIC fc capricorn_db )
target_include_directories( capricorn_net 
  PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include"
  PRIVATE "${CMAKE_SOURCE_DIR}/libraries/chain/include"
)

if(MSVC)
  set_source_files_properties( node.cpp PROPERTIES COMPILE_FLAGS "/bigobj" )
endif(MSVC)

if (USE_PCH)
  set_target_properties(capricorn_net PROPERTIES COTIRE_ADD_UNITY_BUILD FALSE)
  cotire(capricorn_net)
endif(USE_PCH)

install( TARGETS
   capricorn_net

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
install( FILES ${HEADERS} DESTINATION "include/capricorn/net" )
